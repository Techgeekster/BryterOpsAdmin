import { Component, Inject, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AdminUser } from "./IAdminUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";
import { UserAccessType } from '../IUserAccessTypeEnum';
import { ProfileImage } from '../profileImage/profileImage.component';

import '../../../content/styles/croppie.css';

@Component({
    selector: 'adminUserDetail',
    templateUrl: './adminUserDetail.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './adminUserDetail.component.css']
})

export class AdminUserDetailComponent implements OnInit {
    public userAccessTypeID: number = UserAccessType.Admin as number;
    public userAccessTypeName: string = "Admin";

    @Input()
    adminUser: AdminUser;

    @ViewChild('profileImage') profileImage: ProfileImage;

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
            statusName: "",
            createdOn: new Date(),
            createdOnStr: "",
            adminUserTypeName: ""
        }
    }

    show(adminUser: AdminUser)
    {
        var self = this;
        this.adminUser = adminUser;
        $(this.el.nativeElement).show();

        setTimeout(function () {
            self.profileImage.getProfileImage();
        }, 10);
    }
}