import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {RepositoryModel} from "../app.models";

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

    repositories: RepositoryModel[];

    constructor(private _webService: WebService) {
    }

    ngOnInit() {
        this._webService.getRepositoryList().then(response => {
            // Todo: handle errors
            this.repositories = response.result;
            console.log('Repositories were set');
        });
    }

}
