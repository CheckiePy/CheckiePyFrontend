import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';
import {RouterModule} from '@angular/router';

import {WebService} from './web.service';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {MainComponent} from './main/main.component';
import {CodeStyleComponent} from './codestyle/codestyle.component';
import {RepositoryComponent} from './repository/repository.component';
import {SettingsComponent} from './settings/settings.component';
import {TabsComponent} from './tabs/tabs.component';
import {CodeStyleDetailComponent} from './codestyledetail/codestyledetail.component';
import {AddCodeStyleDialogComponent} from './addcodestyledialog/addcodestyledialog.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        MainComponent,
        CodeStyleComponent,
        RepositoryComponent,
        SettingsComponent,
        TabsComponent,
        CodeStyleDetailComponent,
        AddCodeStyleDialogComponent
    ],
    entryComponents: [AddCodeStyleDialogComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MdlModule,
        RouterModule.forRoot([
            {path: '', component: TabsComponent},
            // Todo
            //{path: 'settings', component: SettingsComponent},
            //{path: 'codestyle', component: CodeStyleDetailComponent},
            //{path: 'codestyle/:id', component: CodeStyleDetailComponent}
        ])
    ],
    providers: [WebService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
