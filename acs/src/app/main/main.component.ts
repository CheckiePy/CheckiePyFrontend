import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(private _webService: WebService) {
    }

    ngOnInit() {
    }

    logout() {
        this._webService.logout().then(response => {
            if (response.status == 200 && response.result) {
                this._webService.setToken(null);
                window.location.reload();
            } else {
                // TODO: Logout error message
                console.log('Error message');
            }
        });
    }
}
