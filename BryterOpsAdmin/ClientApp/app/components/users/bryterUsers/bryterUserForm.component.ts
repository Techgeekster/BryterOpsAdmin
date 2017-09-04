import { Component, Inject, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BryterUser } from "./IBryterUser";

@Component({
    selector: 'bryterUserForm',
    templateUrl: './bryterUserForm.component.html',
    styleUrls: ['../../../content/styles/site.css', './bryterUserForm.component.css'],
})

export class BryterUserFormComponent implements OnInit {
    @Input()
    bryterUser: BryterUser;
    @Input()
    header: string;

    @Output()
    closed: EventEmitter<string> = new EventEmitter();
    @Output()
    refreshed: EventEmitter<string> = new EventEmitter();

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        if (!this.bryterUser || this.bryterUser.userID == 0) {
            this.bryterUser = this.getEmptyBryterUser();
            this.header = "Create Bryter User";
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
            assignedCityLicenseIDs: ""
        };
    }

    submit() {
        let body = JSON.stringify(this.bryterUser);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        var params = new URLSearchParams();
        params.set('UserID', this.bryterUser.userID.toString());
        params.set('Username', this.bryterUser.username);
        params.set('CompanyName', this.bryterUser.companyName);
        params.set('CompanyID', this.bryterUser.companyID != null ? this.bryterUser.companyID.toString() : "0");
        params.set('FirstName', this.bryterUser.firstName);
        params.set('LastName', this.bryterUser.lastName);
        params.set('Address1', this.bryterUser.address1);
        params.set('Address2', this.bryterUser.address2);
        params.set('City', this.bryterUser.city);
        params.set('State', this.bryterUser.state);
        params.set('Zipcode', this.bryterUser.zipcode != null ? this.bryterUser.zipcode.toString() : "0");
        params.set('Country', this.bryterUser.country);
        params.set('ExperienceLevel', this.bryterUser.experienceLevel);
        params.set('ManagerName', this.bryterUser.managerName);
        params.set('ManagerPhone', this.bryterUser.managerPhone != null ? this.bryterUser.managerPhone.toString() : "0");
        params.set('ManagerEmail', this.bryterUser.managerEmail);
        params.set('Phone', this.bryterUser.phone != null ? this.bryterUser.phone.toString() : "0");
        params.set('Email', this.bryterUser.email);
        params.set('Rating', this.bryterUser.rating);
        params.set('Photo', this.bryterUser.photo);
        params.set('YearsWithCompany', this.bryterUser.yearsWithCompany != null ? this.bryterUser.yearsWithCompany.toString() : "0");
        params.set('ApprovalRate', this.bryterUser.approvalRate != null ? this.bryterUser.approvalRate.toString() : "0");
        params.set('CompletionRate', this.bryterUser.completionRate != null ? this.bryterUser.completionRate.toString() : "0");
        params.set('RetainingRate', this.bryterUser.retainingRate != null ? this.bryterUser.retainingRate.toString() : "0");
        params.set('AssignedCityLicenseIDs', this.bryterUser.assignedCityLicenseIDs);

        if (this.bryterUser.userID == 0) {
            this.http.post(this.baseUrl + 'BryterUser/CreateBryterUser', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.bryterUser = result.json().data.bryterUser as BryterUser;
                        this.refresh();
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Adding Bryter User");
                    }
                }, error => console.error(error));
        }
        else {
            this.http.post(this.baseUrl + 'BryterUser/EditBryterUser', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.bryterUser = result.json().data.bryterUser as BryterUser;
                        this.refresh()
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Editing Bryter User");
                    }
                }, error => console.error(error));
        }
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