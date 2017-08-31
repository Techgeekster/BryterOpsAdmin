import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'retailers',
    templateUrl: './retailers.component.html',
    styleUrls: ['./retailers.component.css']
})

export class RetailersComponent {
    public retailers: Retailer[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'Retailers/GetAllRetailers')
            .subscribe(result => {
                if (result.json().success) {
                    this.retailers = result.json().data.retailers as Retailer[];
                }
                else
                    console.error(result.json().message);
        }, error => console.error(error));
    }
}

interface Retailer {
    retailerID: number;
    retailerName: string;
    eIN: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    phone: number;
    website: string;
    email: string;
    contact: string;
    approvalRate: number;
    completionRate: number;
    retainingRate: number;
    assignedCityLicenseIDs: string;
    providerIDs: string;
}