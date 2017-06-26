import {Injectable} from '@angular/core';
import {RequestOptions, Http, Headers} from "@angular/http";
import {ResponseModel, RepositoryModel} from "./app.models";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebService {

    private _baseUrl = 'http://127.0.0.1:8000/api';
    private _token: string;
    private _options: RequestOptions;

    constructor(private _http: Http) {
        this._token = localStorage.getItem('token');
        console.log('Restored token ' + this._token);
        this.updateOptions();
    }

    private updateOptions() {
        let headers = new Headers({
           'Content-Type': 'application/json'
        });
        if (this.isAuthenticated()) {
            headers.append('Authorization', 'Token ' + this._token);
        }
        this._options = new RequestOptions({
            headers: headers,
            withCredentials: true
        });
    }

    private logRequest(path) {
        console.log('Request to path ' + path + '. With options:');
        console.log(this._options);
    }

    isAuthenticated(): boolean {
        return this._token != null;
    }

    setToken(token: string) {
        this._token = token;
        localStorage.setItem('token', this._token);
        console.log('Saved token ' + this._token);
        this.updateOptions();
    }

    getRepositoryList(): Promise<ResponseModel<RepositoryModel[]>> {
        let path = '/repository/list/';
        this.logRequest(path);
        return this._http.get(this._baseUrl + path, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<RepositoryModel[]>;
            console.log(r);
            return r;
        });
    }
}
