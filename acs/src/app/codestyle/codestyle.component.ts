import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {CodeStyleModel} from "../app.models";

@Component({
    selector: 'app-codestyle',
    templateUrl: './codestyle.component.html',
    styleUrls: ['./codestyle.component.css']
})
export class CodeStyleComponent implements OnInit {

    codeStyles: CodeStyleModel[];

    constructor(private _webService: WebService) {
    }

    ngOnInit() {
        this._webService.getCodeStyleList().then(response => {
           // Todo: handle errors
            this.codeStyles = response.result;
            console.log('Code styles were set');
        });
    }

    addCodeStyle() {
        alert('This is a simple Alert');
    }
}
