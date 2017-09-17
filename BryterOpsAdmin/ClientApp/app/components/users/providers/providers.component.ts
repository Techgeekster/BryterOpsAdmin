import { Component, Inject, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Provider } from "./IProvider";
import { ProviderDetailComponent } from './providerDetail.component';

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './providers.component.css']
})

export class ProvidersComponent implements OnInit {
    public selectedProvider: Provider;

    @ViewChild('providerDetail') providerDetail: ProviderDetailComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.selectedProvider = this.getEmptyProvider();
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
            assignedCityLicenseIDs: "",
            statusID: 0,
            statusName: "",
            createdOn: new Date(),
            createdOnStr: ""
        }
    }

    showDetails() {
        this.providerDetail.show(this.selectedProvider);
    }
}