import { Component, Inject, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Provider } from "./IProvider";

@Component({
    selector: 'providerForm',
    templateUrl: './providerForm.component.html',
    styleUrls: ['../../../content/styles/site.css', './providerForm.component.css'],
})

export class ProviderFormComponent implements OnInit {
    @Input()
    provider: Provider;
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
        if (!this.provider || this.provider.providerID == 0) {
            this.provider = this.getEmptyProvider();
            this.header = "Create Provider";
        }
    }

    getEmptyProvider() {
        return {
            providerID: 0,
            providerName: "",
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
            statusID: 0
        }
    }

    submit() {
        let body = JSON.stringify(this.provider);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        var params = new URLSearchParams();
        params.set('ProviderID', this.provider.providerID.toString());
        params.set('ProviderName', this.provider.providerName);
        params.set('EIN', this.provider.ein != null ? this.provider.ein.toString() : "0");
        params.set('Address1', this.provider.address1);
        params.set('Address2', this.provider.address2);
        params.set('City', this.provider.city);
        params.set('State', this.provider.state);
        params.set('Zipcode', this.provider.zipcode != null ? this.provider.zipcode.toString() : "0");
        params.set('Phone', this.provider.phone != null ? this.provider.phone.toString() : "0");
        params.set('Website', this.provider.website);
        params.set('Email', this.provider.email);
        params.set('Contact', this.provider.contact);
        params.set('ApprovalRate', this.provider.approvalRate != null ? this.provider.approvalRate.toString() : "0");
        params.set('CompletionRate', this.provider.completionRate != null ? this.provider.completionRate.toString() : "0");
        params.set('RetainingRate', this.provider.retainingRate != null ? this.provider.retainingRate.toString() : "0");
        params.set('AssignedCityLicenseIDs', this.provider.assignedCityLicenseIDs);
        params.set('StatusID', this.provider.statusID != null ? this.provider.statusID.toString() : "0");

        if (this.provider.providerID == 0) {
            this.http.post(this.baseUrl + 'Provider/CreateProvider', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.provider = result.json().data.provider as Provider;
                        this.refresh();
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Adding Provider");
                    }
                }, error => console.error(error));
        }
        else {
            this.http.post(this.baseUrl + 'Provider/EditProvider', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.provider = result.json().data.provider as Provider;
                        this.refresh();
                        this.close();
                    }
                    else {
                        console.error(result.json().message);
                        alert("Error Editing Provider");
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