import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {WebService} from "../web.service";
import {MdlDialogReference} from "@angular-mdl/core";
import {CalculationStatus} from "../app.models";

@Component({
    selector: 'app-addcodestyledialog',
    templateUrl: './addcodestyledialog.component.html',
    styleUrls: ['./addcodestyledialog.component.css']
})
export class AddCodeStyleDialogComponent implements OnInit {

    form: FormGroup;
    name = new FormControl('', Validators.required);
    repository = new FormControl('', Validators.required);
    disableControls = false;
    showLoader = false;
    error = '';

    constructor(private _dialog: MdlDialogReference, private _formBuilder: FormBuilder, private _webService: WebService) {
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            'name': this.name,
            'repository': this.repository
        });
    }

    addCodeStyle() {
        console.log('Name: ' + this.name.value + ', repository: ' + this.repository.value);
        this.error = '';
        this._webService.createCodeStyle(this.name.value, this.repository.value).then(response => {
            if (response.status == 200) {
                this.disableControls = true;
                this.showLoader = true;
                this.pollCodeStyleCalculation(response.result.id);
            } else {
                this.error = 'Cannot create code style. Error code: ' + response.status;
            }
        });
    }

    private pollCodeStyleCalculation(id) {
        console.log('[AddCodeStyleDialogComponent] Polling server for code style '+ id);
        this._webService.readCodeStyle(id).then(response => {
            if (response.status == 200) {
                if (response.result.calculationStatus == CalculationStatus.started) {
                    setTimeout(() => { this.pollCodeStyleCalculation(id); }, 1000);
                    console.log('Interval was set');
                } else if (response.result.calculationStatus == CalculationStatus.completed) {
                    this._dialog.hide(response.result);
                } else if (response.result.calculationStatus == CalculationStatus.failed) {
                    this.error = 'Code style creating is failed. Try again later';
                    this.disableControls = false;
                    this.showLoader = false;
                }
            } else {
                this.error = 'Cannot create code style. Error code: ' + response.status;
                this.disableControls = false;
                this.showLoader = false;
            }
        });
    }

    cancel() {
        this._dialog.hide();
    }

}
