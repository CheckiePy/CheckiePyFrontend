import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {WebService} from './web.service';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {MainComponent} from './main/main.component';
import {CodeStyleComponent} from './codestyle/codestyle.component';
import {RepositoryComponent} from './repository/repository.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        MainComponent,
        CodeStyleComponent,
        RepositoryComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdlModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {path: '', component: CodeStyleComponent},
            {path: 'repository', component: RepositoryComponent},
            {path: 'codestyle', component: CodeStyleComponent}
        ])
    ],
    providers: [WebService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
