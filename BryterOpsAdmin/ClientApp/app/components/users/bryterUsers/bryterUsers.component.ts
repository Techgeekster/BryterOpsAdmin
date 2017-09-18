import { Component, Inject, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { BryterUser } from "./IBryterUser";
import { BryterUserDetailComponent } from './bryterUserDetail.component';

@Component({
    selector: 'bryterUsers',
    templateUrl: './bryterUsers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './bryterUsers.component.css']
})

export class BryterUsersComponent implements OnInit {
    public selectedBryterUser: BryterUser;

    @ViewChild('bryterUserDetail') bryterUserDetail: BryterUserDetailComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.selectedBryterUser = this.getEmptyBryterUser();
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

    showDetails() {
        this.bryterUserDetail.show(this.selectedBryterUser);
    }
}