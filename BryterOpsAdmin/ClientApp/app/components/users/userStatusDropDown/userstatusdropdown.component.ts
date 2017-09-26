import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { BryterDropDownObject } from '../../bryterdropdown/bryterdropdown.component';
import { UserStatus } from '../IUserStatusEnum';

@Component({
    selector: 'userstatusdropdown',
    templateUrl: './userstatusdropdown.component.html',
    styleUrls: ['../../../content/styles/site.css', './userstatusdropdown.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class UserStatusDropDownComponent implements OnInit {
    public userStatuses: BryterDropDownObject[];

    @Input()
    selectedStatusID: number;

    @Output()
    selectedStatusIDChanged: EventEmitter<number> = new EventEmitter();

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        this.userStatuses = [
            { name: "Select Status...", value: -1 },
            { name: "Active", value: (UserStatus.Active as number) },
            { name: "Inactive", value: (UserStatus.Inactive as number) }
        ];

        if (this.selectedStatusID == null || this.selectedStatusID == undefined || this.selectedStatusID == 0)
            this.selectedStatusID = 1;
    }

    setValue(value: string) {
        this.selectedStatusID = parseInt(value);
        this.selectedStatusIDChanged.emit(this.selectedStatusID);
    }
}