import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'adminUsers',
    templateUrl: './adminUsers.component.html',
    styleUrls: ['./adminUsers.component.css']
})

export class AdminUsersComponent {
    public adminUsers: AdminUser[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'AdminUser/GetAllAdminUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUsers = result.json().data.adminUsers as AdminUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }
}

interface AdminUser {
    userID: number,
    username: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    adminUserTypeID: number;
    title: string;
}