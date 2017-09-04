import { Component, Inject, OnInit, NgZone, ElementRef, AfterViewChecked, ViewChild  } from '@angular/core';
import { Http } from '@angular/http';
import { AdminUser } from "./IAdminUser";

@Component({
    selector: 'adminUsers',
    templateUrl: './adminUsers.component.html',
    styleUrls: ['../../../content/styles/site.css', './adminUsers.component.css']
})

export class AdminUsersComponent implements OnInit {
    public adminUsers: AdminUser[];
    //@ViewChild('mypopup') mypopup: ElementRef;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private zone: NgZone,
        private el: ElementRef) { }

    ngOnInit() {
        this.getAdminUsers();
    }

    refresh()
    {
        this.getAdminUsers();
    }

    getAdminUsers()
    {
        this.http.get(this.baseUrl + 'AdminUser/GetAllAdminUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUsers = result.json().data.adminUsers as AdminUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }
}

