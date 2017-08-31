import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'bryterUsers',
    templateUrl: './bryterUsers.component.html',
    styleUrls: ['./bryterUsers.component.css']
})

export class BryterUsersComponent {
    public bryterUsers: BryterUser[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'BryterUsers/GetAllBryterUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.bryterUsers = result.json().data.bryterUsers as BryterUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }
}

interface BryterUser {
    userID: number;
    username: string;
    companyName: string;
    companyID: number;
    cirstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    title: string;
    experienceLevel: string;
    managerName: string;
    managerPhone: number;
    managerEmail: string;
    phone: number;
    email: string;
    rating: string;
    photo: string;
    yearsWithCompany: number;
    approvalRate: number;
    completionRate: number;
    retainingRate: number;
    assignedCityLicenseIDs: string;
}