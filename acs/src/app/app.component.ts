import {Component} from '@angular/core';
import {WebService} from './web.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    isAuthenticated = false;

    constructor(private _webService: WebService) {
        if (_webService.isAuthenticated()) {
            this.isAuthenticated = true;
        }
    }
}
