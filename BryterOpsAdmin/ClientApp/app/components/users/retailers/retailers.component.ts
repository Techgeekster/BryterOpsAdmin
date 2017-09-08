import { Component, Inject, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Retailer } from "./IRetailer";
import { RetailerDetailComponent } from './retailerDetail.component';

@Component({
    selector: 'retailers',
    templateUrl: './retailers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './retailers.component.css']
})

export class RetailersComponent implements OnInit {
    public selectedRetailer: Retailer;

    @ViewChild('retailerDetail') retailerDetail: RetailerDetailComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.selectedRetailer = this.getEmptyRetailer();
    }

    getEmptyRetailer() {
        return {
            retailerID: 0,
            retailerName: "",
            ein: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: 0,
            country: "",
            phone: 0,
            website: "",
            email: "",
            contact: "",
            approvalRate: 0,
            completionRate: 0,
            retainingRate: 0,
            assignedCityLicenseIDs: "",
            providerIDs: "",
            statusID: 0,
            statusName: ""
        }
    }

    showDetails() {
        this.retailerDetail.show(this.selectedRetailer);
    }
}