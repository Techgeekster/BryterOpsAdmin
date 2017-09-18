﻿import { Component, Inject, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BryterUser } from "./IBryterUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";
import { UserAccessType } from '../IUserAccessTypeEnum';
import { ProfileImage } from '../profileImage/profileImage.component';

import '../../../content/styles/croppie.css';

@Component({
    selector: 'bryterUserDetail',
    templateUrl: './bryterUserDetail.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './bryterUserDetail.component.css']
})

export class BryterUserDetailComponent implements OnInit {
    public userAccessTypeID: number = UserAccessType.Bryter as number;
    public userAccessTypeName: string = "Bryter";
    public selectedBryterUserHeader: string;

    @Input()
    bryterUser: BryterUser;

    @ViewChild('profileImage') profileImage: ProfileImage;
    @ViewChild('createBryterUserOverlay') createBryterUserOverlay: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        if (!this.bryterUser || this.bryterUser.userID == 0) {
            this.bryterUser = this.getEmptyBryterUser();
        }
    }

    getEmptyBryterUser() {
        return {
            userID: 0,
            username: "",
            companyName: "",
            companyID: 0,
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: 0,
            country: "",
            title: "",
            experienceLevel: "",
            managerName: "",
            managerPhone: 0,
            managerEmail: "",
            phone: 0,
            email: "",
            rating: "",
            photo: "",
            yearsWithCompany: 0,
            approvalRate: 0,
            completionRate: 0,
            retainingRate: 0,
            assignedCityLicenseIDs: "",
            statusID: 0,
            statusName: "",
            createdOn: new Date(),
            createdOnStr: "",
            bryterUserTypeID: 0,
            bryterUserTypeName: ""
        };
    }

    show(bryterUser: BryterUser) {
        var self = this;
        this.bryterUser = bryterUser;
        $(this.el.nativeElement).show();

        setTimeout(function () {
            self.profileImage.getProfileImage();
        }, 10);
    }

    edit(bryterUser: BryterUser) {
        this.selectedBryterUserHeader = "Edit Bryter User";
        this.bryterUser = bryterUser;
        this.createBryterUserOverlay.show();
    }
}