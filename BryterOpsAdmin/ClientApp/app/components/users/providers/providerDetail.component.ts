import { Component, Inject, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Provider } from "./IProvider";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

import * as $ from 'jquery';
import 'jquery-popup-overlay';

@Component({
    selector: 'providerDetail',
    templateUrl: './providerDetail.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './providerDetail.component.css']
})

export class ProviderDetailComponent implements OnInit {
    @Input()
    provider: Provider;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        if (!this.provider || this.provider.providerID == 0) {
            this.provider = this.getEmptyProvider();
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
            statusID: 0,
            statusName: ""
        }
    }

    show(provider: Provider) {
        this.provider = provider;
        $(this.el.nativeElement).show();
    }
}