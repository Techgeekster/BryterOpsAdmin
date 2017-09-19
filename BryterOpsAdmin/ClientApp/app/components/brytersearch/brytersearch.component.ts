import { Component, Inject, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'brytersearch',
    templateUrl: './brytersearch.component.html',
    styleUrls: ['../../content/styles/bootstrap.css', '../../content/styles/site.css', './brytersearch.component.css']
})

export class BryterSearchComponent implements OnInit {
    foundItems: any;

    @Input()
    items: any;

    @Output()
    foundItemsChanged: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.foundItems = [];

        var self = this;
        $("#searchBox").keypress(function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                self.searchItems($("#searchBox").val());
            }
        });
    }

    searchItems(searchString: string)
    {
        var self = this;
        this.foundItems = [];

        for (var index = 0; index < this.items.length; index++)
        {
            var item = this.items[index];
            var isAdded = false;

            for (var i in (item as any)) {
                if (item.hasOwnProperty(i)) {
                    if (item[i] && item[i].toString().indexOf(searchString) > -1) {
                        if (!isAdded)
                        {
                            self.foundItems.push(item);
                            isAdded = true;
                        }
                    }
                }
            }
        }

        this.foundItemsChanged.emit(this.foundItems);
    }

    searchClick()
    {
        this.searchItems($("#searchBox").val());
    }
}