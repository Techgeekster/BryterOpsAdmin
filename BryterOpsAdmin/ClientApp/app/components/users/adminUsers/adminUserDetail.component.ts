import { Component, Inject, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AdminUser } from "./IAdminUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

@Component({
    selector: 'adminUserDetail',
    templateUrl: './adminUserDetail.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './adminUserDetail.component.css']
})

export class AdminUserDetailComponent implements OnInit {
    @Input()
    adminUser: AdminUser;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        if (!this.adminUser || this.adminUser.userID == 0) {
            this.adminUser = this.getEmptyAdminUser();
        }
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
            statusName: ""
        }
    }

    show(adminUser: AdminUser)
    {
        this.adminUser = adminUser;
        $(this.el.nativeElement).show();
    }
}