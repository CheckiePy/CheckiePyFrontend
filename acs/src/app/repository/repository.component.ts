import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {RepositoryModel, CodeStyleModel, CalculationStatus} from "../app.models";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

    repositories: RepositoryModel[];
    hideRepositories = false;
    showLoader = false;
    showModal = false;
    showErrorModal = false;
    codeStyles: CodeStyleModel[];
    repositoryId: number;
    error = '';
    modalError = '';

    constructor(private _router: Router, private _webService: WebService, private _titleService: Title) {
    }

    ngOnInit() {
        this._titleService.setTitle('Repositories');
        this.loadRepositoryList();
    }

    connectRepository(repositoryId) {
        this._webService.getCodeStyleList().then(response => {
            if (response.status == 200) {
                this.codeStyles = response.result;
                console.log('[RepositoryComponent] Code styles were set');
            }
            if (this.codeStyles == null || this.codeStyles.length == 0) {
                this.openErrorModal('You need at least one code style to create connection');
            } else {
                this.repositoryId = repositoryId;
                this.showModal = true;
            }
        });
    }

    private clearCodeStyleSelection() {
        for (let i = 0; i < this.codeStyles.length; i++) {
            this.codeStyles[i].selected = false;
        }
    }

    closeModal() {
        this.showModal = false;
        this.repositoryId = null;
    }

    openErrorModal(error: string) {
        this.modalError = error;
        this.showErrorModal = true;
    }

    closeErrorModal() {
        this.showErrorModal = false;
    }

    createConnection() {
        let codeStyleId;
        for (let i = 0; i < this.codeStyles.length; i++) {
            if (this.codeStyles[i].selected) {
                codeStyleId = this.codeStyles[i].id;
                break;
            }
        }
        if (codeStyleId == null) {
            this.error = 'TODO: error message';
            return;
        }
        this._webService.createRepositoryConnection(this.repositoryId, codeStyleId).then(response => {
            // Todo: handle async
            let repository = this.repositories.find(r => r.id == this.repositoryId);
            repository.isConnected = true;
            this.closeModal();
        });
    }

    selectCodeStyle(codeStyleId) {
        this.clearCodeStyleSelection();
        for (let i = 0; i < this.codeStyles.length; i++) {
            if (this.codeStyles[i].id == codeStyleId) {
                this.codeStyles[i].selected = true;
            }
        }
        console.log('[RepositoryComponent] Code style with id ' + codeStyleId + 'was selected');
    }

    refreshRepositoryList() {
        this._webService.updateRepositoryList().then(response => {
            if (response.status == 200) {
                console.log('[RepositoryComponent] Update repository request was successfully sent');
                this.hideRepositories = true;
                this.showLoader = true;
                this.pollRepositoryUpdateStatus();
            } else {
                this.openErrorModal('Cannot refresh repository list. Error code: ' + response.status);
            }
        });
    }

    private loadRepositoryList() {
        this._webService.getRepositoryList().then(response => {
            if (response.status == 200) {
                this.repositories = response.result;
                console.log('[RepositoryComponent] Repositories were set');
            } else {
                this.openErrorModal('Cannot refresh repository list. Error code: ' + response.status);
                this.showLoader = false;
                this.hideRepositories = false;
            }
        });
    }

    private pollRepositoryUpdateStatus() {
        this._webService.readLastRepositoryUpdate().then(response => {
            if (response.status == 200) {
                if (response.result.status == CalculationStatus.completed) {
                    this.loadRepositoryList();
                    this.showLoader = false;
                    this.hideRepositories = false;
                } else if (response.result.status == CalculationStatus.failed) {
                    this.openErrorModal('Repository list refreshing failed. Try again later');
                    this.showLoader = false;
                    this.hideRepositories = false;
                } else if (response.result.status == CalculationStatus.started) {
                    setTimeout(() => { this.pollRepositoryUpdateStatus(); }, 1000);
                    console.log('[RepositoryComponent] Timeout was set');
                }
            } else {
                this.openErrorModal('Cannot refresh repository list. Error code: ' + response.status);
                this.showLoader = false;
                this.hideRepositories = false;
            }
        });
    }

    disconnectRepository(repositoryId) {
        this._webService.deleteRepositoryConnection(repositoryId).then(response => {
            if (response.detail == null) {
                let repository = this.repositories.filter(r => r.id == response.result).pop();
                if (repository != null) {
                    repository.isConnected = false;
                }
            }
        });
    }

}
