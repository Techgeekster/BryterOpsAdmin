﻿import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Provider } from "./IProvider";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './providers.component.css']
})

export class ProvidersComponent implements OnInit {
    public providers: Provider[];
    public selectedProvider: Provider;
    public selectedProviderHeader: string;
    @ViewChild('createProviderOverlay') createProviderOverlay: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.getProviders();
        this.selectedProvider = this.getEmptyProvider();
    }

    refresh() {
        this.getProviders();
    }

    getProviders() {
        this.http.get(this.baseUrl + 'Provider/GetAllProviders')
            .subscribe(result => {
                if (result.json().success) {
                    this.providers = result.json().data.providers as Provider[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    getEmptyProvider()
    {
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
            assignedCityLicenseIDs: ""
        }
    }

    show() {
        this.selectedProvider = this.getEmptyProvider();
        this.selectedProviderHeader = "Create Provider";

        this.createProviderOverlay.show();
    }

    edit(provider: Provider) {
        this.selectedProviderHeader = "Edit Provider";
        this.selectedProvider = provider;
        this.createProviderOverlay.show();

        this.refresh();
    }

    delete(provider: Provider) {
        var confirmDelete = confirm("Are you sure you want to delete " + provider.providerName + "?");

        if (confirmDelete) {
            let body = JSON.stringify(provider);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

            var params = new URLSearchParams();
            params.set('ProviderID', provider.providerID.toString());

            this.http.post(this.baseUrl + 'Provider/DeleteProvider', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.providers = result.json().data.providers as Provider[];
                    }
                    else
                        console.error(result.json().message);
                }, error => console.error(error));

            this.refresh();
        }
    }
}