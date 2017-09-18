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
import { AdminUsersBasicComponent } from './components/users/adminUsers/adminUsersBasic.component';
import { AdminUserFormComponent } from './components/users/adminUsers/adminUserForm.component';
import { AdminUserDetailComponent } from './components/users/adminUsers/adminUserDetail.component';
import { AdminUserTypeDropDownComponent } from './components/users/adminUsers/adminUserTypeDropDown/adminUserTypeDropDown.component';

import { BryterUsersComponent } from './components/users/bryterUsers/bryterUsers.component';
import { BryterUsersBasicComponent } from './components/users/bryterUsers/bryterusersBasic.component';
import { BryterUserFormComponent } from './components/users/bryterUsers/bryterUserForm.component';
import { BryterUserDetailComponent } from './components/users/bryterUsers/bryterUserDetail.component';
import { BryterUserTypeDropDownComponent } from './components/users/bryterUsers/bryterUserTypeDropDown/bryterUserTypeDropDown.component';

import { RetailersComponent } from './components/users/retailers/retailers.component';
import { RetailersBasicComponent } from './components/users/retailers/retailersBasic.component';
import { RetailerFormComponent } from './components/users/retailers/retailerForm.component';
import { RetailerDetailComponent } from './components/users/retailers/retailerDetail.component';

import { ProvidersComponent } from './components/users/providers/providers.component';
import { ProvidersBasicComponent } from './components/users/providers/providersBasic.component';
import { ProviderFormComponent } from './components/users/providers/providerForm.component';
import { ProviderDetailComponent } from './components/users/providers/providerDetail.component';

import { ProfileImage } from './components/users/profileImage/profileImage.component';
import { UserTypeDropDownComponent } from './components/users/userTypeDropDown/usertypedropdown.component';

import { JQueryPopupOverlay } from './components/jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component';
import { CroppieComponent } from './components/jquerywrappers/croppie/croppie.component';

import { BryterDropDownComponent } from './components/bryterdropdown/bryterdropdown.component';

import { BryterValidationDirective } from './directives/brytervalidation/brytervalidation.directive';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        AdminUsersComponent,
        AdminUsersBasicComponent,
        AdminUserFormComponent,
        AdminUserDetailComponent,
        AdminUserTypeDropDownComponent,
        BryterUsersComponent,
        BryterUsersBasicComponent,
        BryterUserFormComponent,
        BryterUserDetailComponent,
        BryterUserTypeDropDownComponent,
        RetailersComponent,
        RetailersBasicComponent,
        RetailerFormComponent,
        RetailerDetailComponent,
        ProvidersComponent,
        ProvidersBasicComponent,
        ProviderFormComponent,
        ProviderDetailComponent,
        ProfileImage,
        HomeComponent,
        JQueryPopupOverlay,
        CroppieComponent,
        BryterDropDownComponent,
        UserTypeDropDownComponent,
        BryterValidationDirective
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
