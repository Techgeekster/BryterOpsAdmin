import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Retailer } from "./IRetailer";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

@Component({
    selector: 'retailers',
    templateUrl: './retailers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './retailers.component.css']
})

export class RetailersComponent implements OnInit {
    public retailers: Retailer[];
    public selectedRetailer: Retailer;
    public selectedRetailerHeader: string;
    @ViewChild('createRetailerOverlay') createRetailerOverlay: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.getRetailers();
        this.selectedRetailer = this.getEmptyRetailer();
    }

    refresh() {
        this.getRetailers();
    }

    getRetailers() {
        this.http.get(this.baseUrl + 'Retailer/GetAllRetailers')
            .subscribe(result => {
                if (result.json().success) {
                    this.retailers = result.json().data.retailers as Retailer[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
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
            statusID: 0
        }
    }

    show() {
        this.selectedRetailer = this.getEmptyRetailer();
        this.selectedRetailerHeader = "Create Retailer";

        this.createRetailerOverlay.show();
    }

    edit(retailer: Retailer) {
        this.selectedRetailerHeader = "Edit Retailer";
        this.selectedRetailer = retailer;
        this.createRetailerOverlay.show();

        this.refresh();
    }

    delete(retailer: Retailer) {
        var confirmDelete = confirm("Are you sure you want to delete " + retailer.retailerName + "?");

        if (confirmDelete) {
            let body = JSON.stringify(retailer);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

            var params = new URLSearchParams();
            params.set('RetailerID', retailer.retailerID.toString());

            this.http.post(this.baseUrl + 'Retailer/DeleteRetailer', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.retailers = result.json().data.retailers as Retailer[];
                    }
                    else
                        console.error(result.json().message);
                }, error => console.error(error));

            this.refresh();
        }
    }
}