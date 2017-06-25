import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

    constructor(private _webService: WebService) {
    }

    ngOnInit() {
        this._webService.getRepositoryList();
    }

}
