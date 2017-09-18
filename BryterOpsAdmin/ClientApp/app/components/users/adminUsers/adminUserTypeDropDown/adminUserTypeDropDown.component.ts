import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { AdminUserType } from '../IAdminUserType';
import { BryterDropDownObject } from '../../../bryterdropdown/bryterdropdown.component';

@Component({
    selector: 'adminusertypedropdown',
    templateUrl: './adminUserTypeDropDown.component.html',
    styleUrls: ['../../../../content/styles/site.css', './adminUserTypeDropDown.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AdminUserTypeDropDownComponent implements OnInit, AfterViewChecked {
    public userTypes: BryterDropDownObject[];

    @Input()
    selectedUserTypeID: number;

    @Output()
    selectedUserTypeIDChanged: EventEmitter<number> = new EventEmitter();

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        this.userTypes = [
            { name: "Admin", value: (AdminUserType.Admin as number) },
            { name: "Development", value: (AdminUserType.Development as number) },
            { name: "IT", value: (AdminUserType.IT as number) },
            { name: "QA", value: (AdminUserType.QA as number) }
        ];
        if (this.selectedUserTypeID == null || this.selectedUserTypeID == undefined || this.selectedUserTypeID == 0)
            this.selectedUserTypeID = 1;

        var self = this;

        setInterval(function () {
            if (self.selectedUserTypeID != 0)
                console.log(self.selectedUserTypeID);
        }, 1000);
    }

    ngAfterViewChecked() {
    }

    setValue(value: string)
    {
        this.selectedUserTypeID = parseInt(value);
        this.selectedUserTypeIDChanged.emit(this.selectedUserTypeID);
    }
}