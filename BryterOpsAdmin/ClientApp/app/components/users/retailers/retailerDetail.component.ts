import { Component, Inject, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Retailer } from "./IRetailer";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";
import { UserAccessType } from '../IUserAccessTypeEnum';
import { ProfileImage } from '../profileImage/profileImage.component';

import '../../../content/styles/croppie.css';

@Component({
    selector: 'retailerDetail',
    templateUrl: './retailerDetail.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './retailerDetail.component.css']
})

export class RetailerDetailComponent implements OnInit {
    public userAccessTypeID: number = UserAccessType.Retailer as number;
    public userAccessTypeName: string = "Retailer";

    @Input()
    retailer: Retailer;

    @ViewChild('profileImage') profileImage: ProfileImage;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        if (!this.retailer || this.retailer.retailerID == 0) {
            this.retailer = this.getEmptyRetailer();
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

    show(retailer: Retailer) {
        var self = this;
        this.retailer = retailer;
        $(this.el.nativeElement).show();

        setTimeout(function () {
            self.profileImage.getProfileImage();
        }, 10);
    }
}