import {Injectable} from '@angular/core';
import {RequestOptions, Http, Headers} from "@angular/http";

@Injectable()
export class WebService {

    private _baseUrl = 'http://127.0.0.1:8000/api';
    private _token: string;
    private _options: RequestOptions;

    constructor(private _http: Http) {
    }

    private updateOptions() {
        let headers = new Headers({
           'Content-Type': 'application/json'
        });
        if (this.isAuthenticated()) {
            headers.append('Authorization', 'Token: ' + this._token);
        }
        this._options = new RequestOptions({
            headers: headers,
            withCredentials: true
        });
    }

    isAuthenticated(): boolean {
        return this._token != null;
    }

    setToken(token: string) {
        this._token = token;
        this.updateOptions();
    }

    getRepositoryList() {
        this._http.get(this._baseUrl + '/repository/list/', this._options).subscribe(response => {
            console.log(response);
        });
    }
}
