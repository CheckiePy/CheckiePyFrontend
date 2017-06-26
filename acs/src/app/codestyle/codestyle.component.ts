import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {CodeStyleModel} from "../app.models";
import {MdlDialogService} from "@angular-mdl/core";
import {AddCodeStyleDialogComponent} from "../addcodestyledialog/addcodestyledialog.component";

@Component({
    selector: 'app-codestyle',
    templateUrl: './codestyle.component.html',
    styleUrls: ['./codestyle.component.css']
})
export class CodeStyleComponent implements OnInit {

    codeStyles: CodeStyleModel[];

    constructor(private _webService: WebService, private _dialogService: MdlDialogService) {
    }

    ngOnInit() {
        this._webService.getCodeStyleList().then(response => {
           // Todo: handle errors
            this.codeStyles = response.result;
            console.log('Code styles were set');
        });
    }

    createCodeStyle() {
        let addCodeStyleDialog = this._dialogService.showCustomDialog({
            component: AddCodeStyleDialogComponent,
            isModal: true
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
