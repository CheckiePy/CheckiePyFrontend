import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';

import {WebService} from './web.service';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { CodestyleComponent } from './codestyle/codestyle.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        MainComponent,
        CodestyleComponent,
        RepositoryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdlModule
    ],
    providers: [WebService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
