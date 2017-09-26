import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BryterDropDownObject } from '../bryterdropdown/bryterdropdown.component';

@Component({
    selector: 'bryterdropdownfilter',
    templateUrl: './bryterdropdownfilter.component.html',
    styleUrls: ['../../content/styles/site.css', './bryterdropdownfilter.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BryterDropDownFilterComponent implements OnInit {
    @Input()
    filters: BryterDropDownObject[];
    @Input()
    items: any;
    @Input()
    filterOnProp: any;
    @Input()
    selectedFilter: number;

    @Output()
    filteredItemsChanged: EventEmitter<any> = new EventEmitter();

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        
    }

    filter(filterID: any) {
        var filteredList = this.items.filter((item: any) => item[this.filterOnProp].toString() === filterID.toString());

        if (filteredList.length == 0 && filterID < 0)
            filteredList = this.items;

        this.filteredItemsChanged.emit(filteredList);
    }
}