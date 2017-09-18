import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { UserAccessType } from '../IUserAccessTypeEnum';
import { BryterDropDownObject } from '../../bryterdropdown/bryterdropdown.component';

@Component({
    selector: 'usertypedropdown',
    templateUrl: './usertypedropdown.component.html',
    styleUrls: ['../../../content/styles/site.css', './usertypedropdown.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class UserTypeDropDownComponent implements OnInit {
    public userTypes: BryterDropDownObject[];

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        this.userTypes = [
            { name: "Admin", value: (UserAccessType.Admin as number) },
            { name: "Bryter", value: (UserAccessType.Bryter as number) },
            { name: "Retailer", value: (UserAccessType.Retailer as number) },
            { name: "Provider", value: (UserAccessType.Provider as number) }
        ];
    }
}