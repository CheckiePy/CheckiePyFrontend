import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';
import {RouterModule} from '@angular/router';

import {WebService} from './web.service';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {MainComponent} from './main/main.component';
import {CodestyleComponent} from './codestyle/codestyle.component';
import {RepositoryComponent} from './repository/repository.component';
import {SettingsComponent} from './settings/settings.component';
import {TabsComponent} from './tabs/tabs.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        MainComponent,
        CodestyleComponent,
        RepositoryComponent,
        SettingsComponent,
        TabsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdlModule,
        RouterModule.forRoot([
            {path: '', component: TabsComponent},
            {path: 'settings', component: SettingsComponent}
        ])
    ],
    providers: [WebService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
