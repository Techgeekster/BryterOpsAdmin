import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'bryterdropdown',
    templateUrl: './bryterdropdown.component.html',
    styleUrls: ['../../content/styles/site.css', './bryterdropdown.component.css'],
})

export class BryterDropDownComponent implements OnInit, AfterViewChecked {
    @Input()
    value: string;
    @Input()
    options: BryterDropDownObject[];

    @Output()
    valueChanged: EventEmitter<string> = new EventEmitter();

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        if (this.options == undefined)
            this.options = [{ name: "Default", value: 0 }];
    }

    ngAfterViewChecked() {
        var self = this;

        $("option").click(function (e) {
            self.value = $(e.target).val();
            self.valueChanged.emit(self.value);
        });

        $("option[value='" + self.value + "']").prop("selected", true);
    }
}

export interface BryterDropDownObject {
    name: string;
    value: number;
}