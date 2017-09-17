import { Component, Inject, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';
import { Http } from '@angular/http';
import { AdminUser } from "./IAdminUser";
import { AdminUserDetailComponent } from './adminUserDetail.component';

@Component({
    selector: 'adminUsers',
    templateUrl: './adminUsers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './adminUsers.component.css']
})

export class AdminUsersComponent implements OnInit {
    public selectedAdminUser: AdminUser;

    @ViewChild('adminUserDetail') adminUserDetail: AdminUserDetailComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.selectedAdminUser = this.getEmptyAdminUser();
    }

    getEmptyAdminUser() {
        return {
            userID: 0,
            username: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: "",
            adminUserTypeID: 0,
            title: "",
            statusID: 0,
            statusName: "",
            createdOn: new Date(),
            createdOnStr: ""
        }
    }

    showDetails() {
        this.adminUserDetail.show(this.selectedAdminUser);
    }
}