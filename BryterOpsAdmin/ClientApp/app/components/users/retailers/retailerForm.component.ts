import { Component, Inject, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Retailer } from "./IRetailer";

@Component({
    selector: 'retailerForm',
    templateUrl: './retailerForm.component.html',
    styleUrls: ['../../../content/styles/site.css', './retailerForm.component.css'],
})

export class RetailerFormComponent implements OnInit {
    @Input()
    retailer: Retailer;
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
        if (!this.retailer || this.retailer.retailerID == 0) {
            this.retailer = this.getEmptyRetailer();

            this.header = "Create Admin User";
        }
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
            statusName: "",
            createdOn: new Date(),
            createdOnStr: ""
        }
    }

    submit() {
        let body = JSON.stringify(this.retailer);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        var params = new URLSearchParams();
        params.set('RetailerID', this.retailer.retailerID.toString());
        params.set('RetailerName', this.retailer.retailerName);
        params.set('EIN', this.retailer.ein != null ? this.retailer.ein.toString() : "");
        params.set('Address1', this.retailer.address1);
        params.set('Address2', this.retailer.address2);
        params.set('City', this.retailer.city);
        params.set('State', this.retailer.state);
        params.set('Zipcode', this.retailer.zipcode != null ? this.retailer.zipcode.toString() : "0");
        params.set('Phone', this.retailer.phone != null ? this.retailer.phone.toString() : "0");
        params.set('Website', this.retailer.website);
        params.set('Email', this.retailer.email);
        params.set('Contact', this.retailer.contact);
        params.set('ApprovalRate', this.retailer.approvalRate != null ? this.retailer.approvalRate.toString() : "0");
        params.set('CompletionRate', this.retailer.completionRate != null ? this.retailer.completionRate.toString() : "0");
        params.set('RetainingRate', this.retailer.retainingRate != null ? this.retailer.retainingRate.toString() : "0");
        params.set('AssignedCityLicenseIDs', this.retailer.assignedCityLicenseIDs);
        params.set('ProviderIDs', this.retailer.providerIDs);
        params.set('StatusID', this.retailer.statusID != null ? this.retailer.statusID.toString() : "0");
        params.set('StatusName', this.retailer.statusName);

        if (this.retailer.retailerID == 0) {
            this.http.post(this.baseUrl + 'Retailer/CreateRetailer', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.retailer = result.json().data.retailer as Retailer;
                        this.refresh();
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Adding Retailer");
                    }
                }, error => console.error(error));
        }
        else {
            this.http.post(this.baseUrl + 'Retailer/EditRetailer', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.retailer = result.json().data.retailer as Retailer;
                        this.refresh();
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Editing Retailer");
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