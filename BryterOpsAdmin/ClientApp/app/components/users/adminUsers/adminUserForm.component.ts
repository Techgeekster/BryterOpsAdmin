﻿import { Component, Inject, OnInit, NgZone, ElementRef, AfterViewChecked, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { AdminUser } from "./IAdminUser";


@Component({
    selector: 'adminUserForm',
    templateUrl: './adminUserForm.component.html',
    styleUrls: ['../../../content/styles/site.css', './adminUserForm.component.css']
})

export class AdminUserFormComponent implements OnInit {
    public adminUser: AdminUser;

    @Output()
    closed: EventEmitter<string> = new EventEmitter();
    @Output()
    refreshed: EventEmitter<string> = new EventEmitter();

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private zone: NgZone,
        private el: ElementRef) { }

    ngOnInit() {
        this.adminUser = {
            userID: 0,
            username: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: "",
            adminUserTypeID: 0,
            title: ""
        }
    }

    submit()
    {
        let body = JSON.stringify(this.adminUser);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        var params = new URLSearchParams();
        params.set('Username', this.adminUser.username);
        params.set('FirstName', this.adminUser.firstName);
        params.set('LastName', this.adminUser.lastName);
        params.set('Phone', this.adminUser.phone.toString());
        params.set('Email', this.adminUser.email);
        params.set('Title', this.adminUser.title);

        this.http.post(this.baseUrl + 'AdminUser/CreateAdminUser', params.toString(), { headers: headers })
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUser = result.json().data.adminUser as AdminUser;
                    this.refresh();
                    this.close();
                }
                else
                {
                    console.error(result.json().message);
                    alert("Error Adding Admin User");
                }
            }, error => console.error(error));
    }

    refresh()
    {
        this.refreshed.emit();
    }

    close()
    {
        this.closed.emit();
    }
}