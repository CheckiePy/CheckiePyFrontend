import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {WebService} from "../web.service";
import {MdlDialogReference} from "@angular-mdl/core";

@Component({
    selector: 'app-addcodestyledialog',
    templateUrl: './addcodestyledialog.component.html',
    styleUrls: ['./addcodestyledialog.component.css']
})
export class AddCodeStyleDialogComponent implements OnInit {

    form: FormGroup;
    name = new FormControl('', Validators.required);
    repository = new FormControl('', Validators.required);

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
        this._webService.createCodeStyle(this.name.value, this.repository.value).then(response => {
            if (response.detail == null) {
                this._dialog.hide();
            }
        });
    }

    cancel() {
        this._dialog.hide();
    }

}
