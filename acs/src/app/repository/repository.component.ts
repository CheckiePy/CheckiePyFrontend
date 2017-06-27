import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {RepositoryModel, CodeStyleModel} from "../app.models";
import {MdlDialogService, IMdlDialogAction} from "@angular-mdl/core";

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

    repositories: RepositoryModel[];
    private _codeStyles: CodeStyleModel[];

    constructor(private _webService: WebService, private _dialogService: MdlDialogService) {
    }

    ngOnInit() {
        // Todo: handle errors
        this._webService.getRepositoryList().then(response => {
            this.repositories = response.result;
            console.log('[RepositoryComponent] Repositories were set');
        });
        this._webService.getCodeStyleList().then(response => {
            this._codeStyles = response.result;
            console.log('[RepositoryComponent] Code styles were set');
        });
    }

    connectRepository(repositoryId) {
        let actions = [];
        for (let codeStyle of this._codeStyles) {
            actions.push({
                handler: () => {
                    this._webService.createRepositoryConnection(repositoryId, codeStyle.id).then(response => {
                        // Todo: change connect button appearance
                    });
                },
                text: codeStyle.name,
                isClosingAction: true
            });
        }
        let dialog = this._dialogService.showDialog({
            title: 'Select code style',
            message: 'This code style will be used to check repository',
            actions: actions as [IMdlDialogAction],
            fullWidthAction: true,
            isModal: false
        });
    }

    refreshRepositoryList() {
        this._webService.updateRepositoryList().then(response => {
            console.log('[RepositoryComponent] Update repository request was sent');
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
