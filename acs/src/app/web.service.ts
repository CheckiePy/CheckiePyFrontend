import {Injectable} from '@angular/core';
import {RequestOptions, Http, Headers} from "@angular/http";
import {ResponseModel, RepositoryModel, CodeStyleModel, RepositoryUpdateModel} from "./app.models";
import {environment} from '../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebService {

    private _baseUrl = environment.url;
    private _token: string;
    private _options: RequestOptions;

    constructor(private _http: Http) {
        this.setToken(localStorage.getItem('token'));
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
        console.log('Token (isAuthenticated): ' + this._token);
        return !!this._token;
    }

    setToken(token: string) {
        this._token = token;
        if (token == null) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', this._token);
        }
        this.updateOptions();
        console.log('Updated token ' + this._token);
    }

    getRepositoryList(): Promise<ResponseModel<RepositoryModel[]>> {
        let path = '/repository/list/';
        this.logRequest(path);
        return this._http.get(this._baseUrl + path, this._options).toPromise().then(response => {
            let repositories: RepositoryModel[] = [];
            let objects = response.json() as object[];
            for (let obj of objects['result']) {
                repositories.push(new RepositoryModel(obj['id'], obj['name'], obj['is_connected'], obj['code_style_name']));
            }
            let r = new ResponseModel<RepositoryModel[]>(repositories);
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    getCodeStyleList(): Promise<ResponseModel<CodeStyleModel[]>> {
        let path = '/code_style/list/';
        this.logRequest(path);
        return this._http.get(this._baseUrl + path, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<CodeStyleModel[]>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    deleteCodeStyle(id): Promise<ResponseModel<number>> {
        let path = '/code_style/delete/';
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, {'id': id}, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<number>;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    createCodeStyle(name, repository): Promise<ResponseModel<CodeStyleModel>> {
        let path = '/code_style/create/';
        let body = {'name': name, 'repository': repository};
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, body, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<CodeStyleModel>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    createRepositoryConnection(repositoryId, codeStyleId): Promise<ResponseModel<number>> {
        let path = '/repository/connect/';
        let body = {'repository': repositoryId, 'code_style': codeStyleId};
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, body, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<number>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    deleteRepositoryConnection(repositoryId) {
        let path = '/repository/disconnect/';
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, {'id': repositoryId}, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<number>;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    updateRepositoryList(): Promise<ResponseModel<string>> {
        let path = '/repository/update/';
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, '', this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<string>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    logout(): Promise<ResponseModel<boolean>> {
        let path = '/logout/';
        this.logRequest(path);
        return this._http.post(this._baseUrl + path, '', this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<boolean>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    readCodeStyle(id): Promise<ResponseModel<CodeStyleModel>> {
        let path = '/code_style/read/' + id;
        this.logRequest(path);
        return this._http.get(this._baseUrl + path, this._options).toPromise().then(response => {
            let obj = response.json() as object;
            let r = new ResponseModel<CodeStyleModel>();
            r.status = response.status;
            r.detail = obj['detail'];
            let result = obj['result'];
            if (result != null) {
                r.result = new CodeStyleModel(result['id'], result['name'], result['repository'], result['calc_status']);
            }
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    readLastRepositoryUpdate(): Promise<ResponseModel<RepositoryUpdateModel>> {
        let path = '/repository/last_update/';
        this.logRequest(path);
        return this._http.get(this._baseUrl + path, this._options).toPromise().then(response => {
            let r = response.json() as ResponseModel<RepositoryUpdateModel>;
            r.status = response.status;
            console.log(r);
            return r;
        }).catch(this.handleError.bind(this));
    }

    private handleError(response) {
        console.log('Error: ' + response);
        if (response.status == 401) {
            this.setToken(null);
            // TODO: unauthorized message
            window.location.reload();
        }
        return response;
    }
}
