import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { BryterUserType } from '../IBryterUserType';
import { BryterDropDownObject } from '../../../bryterdropdown/bryterdropdown.component';

@Component({
    selector: 'bryterusertypedropdown',
    templateUrl: './bryterUserTypeDropDown.component.html',
    styleUrls: ['../../../../content/styles/site.css', './bryterUserTypeDropDown.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BryterUserTypeDropDownComponent implements OnInit, AfterViewChecked {
    public userTypes: BryterDropDownObject[];

    @Input()
    selectedUserTypeID: number;

    @Output()
    selectedUserTypeIDChanged: EventEmitter<number> = new EventEmitter();

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        this.userTypes = [
            { name: "Basic", value: (BryterUserType.Basic as number) },
            { name: "Supervisor", value: (BryterUserType.Supervisor as number) },
            { name: "Admin Retailer", value: (BryterUserType.AdminRetailer as number) },
            { name: "Admin Provider", value: (BryterUserType.AdminProvider as number) }
        ];
        if (this.selectedUserTypeID == null || this.selectedUserTypeID == undefined || this.selectedUserTypeID == 0)
            this.selectedUserTypeID = 1;
    }

    ngAfterViewChecked() {
    }

    setValue(value: string)
    {
        this.selectedUserTypeID = parseInt(value);
        this.selectedUserTypeIDChanged.emit(this.selectedUserTypeID);
    }
}