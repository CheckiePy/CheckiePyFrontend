import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {CalculationStatus, CodeStyleModel} from "../app.models";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-codestyle',
    templateUrl: './codestyle.component.html',
    styleUrls: ['./codestyle.component.css']
})
export class CodeStyleComponent implements OnInit {

    codeStyles: CodeStyleModel[];
    showModal = false;
    form: FormGroup;
    name = new FormControl('', Validators.required);
    repository = new FormControl('', Validators.required);
    disableControls = false;
    showLoader = false;
    error = '';

    constructor(private _router: Router, private _webService: WebService, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            'name': this.name,
            'repository': this.repository
        });
        this._webService.getCodeStyleList().then(response => {
           // TODO: handle errors
            this.codeStyles = response.result;
            console.log('Code styles were set');
        });
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    createCodeStyle() {
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
                    if (response.result != null) {
                        this.codeStyles.push(response.result);
                        console.log('[CodeStyleComponent] Code style returned from dialog was saved');
                    } else {
                        console.log('[CodeStyleComponent] Dialog does not return code style');
                    }
                    this.showModal = false;
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

    deleteCodeStyle(id) {
        this._webService.deleteCodeStyle(id).then(response => {
           if (response.detail == null) {
               this.codeStyles = this.codeStyles.filter(cs => cs.id != response.result);
           }
        });
    }
}
