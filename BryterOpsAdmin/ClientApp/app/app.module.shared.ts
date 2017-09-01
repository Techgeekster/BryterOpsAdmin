import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BryterUsersComponent } from './components/users/bryterUsers/bryterUsers.component';
import { AdminUsersComponent } from './components/users/adminUsers/adminUsers.component';
import { RetailersComponent } from './components/users/retailers/retailers.component';
import { ProvidersComponent } from './components/users/providers/providers.component';

import { JQueryPopupOverlay } from './components/jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        BryterUsersComponent,
        AdminUsersComponent,
        RetailersComponent,
        ProvidersComponent,
        HomeComponent,
        JQueryPopupOverlay
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'bryterUsers', component: BryterUsersComponent },
            { path: 'adminUsers', component: AdminUsersComponent },
            { path: 'retailers', component: RetailersComponent },
            { path: 'providers', component: ProvidersComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
