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

import { AdminUsersComponent } from './components/users/adminUsers/adminUsers.component';
import { AdminUserFormComponent } from './components/users/adminUsers/adminUserForm.component';
import { BryterUsersComponent } from './components/users/bryterUsers/bryterUsers.component';
import { BryterUserFormComponent } from './components/users/bryterUsers/bryterUserForm.component';
import { RetailersComponent } from './components/users/retailers/retailers.component';
import { RetailerFormComponent } from './components/users/retailers/retailerForm.component';
import { ProvidersComponent } from './components/users/providers/providers.component';
import { ProviderFormComponent } from './components/users/providers/providerForm.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalComponent } from './components/bootstrap/bootstrapmodal/bootstrapmodal.component'

import { JQueryPopupOverlay } from './components/jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        AdminUsersComponent,
        AdminUserFormComponent,
        BryterUsersComponent,
        BryterUserFormComponent,
        RetailersComponent,
        RetailerFormComponent,
        ProvidersComponent,
        ProviderFormComponent,
        HomeComponent,
        BootstrapModalComponent,
        JQueryPopupOverlay
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        NgbModule.forRoot(),
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
