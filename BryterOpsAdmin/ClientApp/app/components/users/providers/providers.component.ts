import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})

export class ProvidersComponent {
    public providers: Provider[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'Providers/GetAllProviders')
            .subscribe(result => {
                if (result.json().success) {
                    this.providers = result.json().data.providers as Provider[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }
}

interface Provider {
    providerID: number;
    providerName: string;
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
}