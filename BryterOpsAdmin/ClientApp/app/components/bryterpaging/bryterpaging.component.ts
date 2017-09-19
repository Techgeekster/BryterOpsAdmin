import { Component, Inject, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'bryterpaging',
    templateUrl: './bryterpaging.component.html',
    styleUrls: ['../../content/styles/bootstrap.css', '../../content/styles/site.css', './bryterpaging.component.css']
})

export class BryterPagingComponent implements OnInit {
    numBtns: number[];
    currentPage: number;
    numPages: number;
    showFirstPageBtn: boolean;
    showLastPageBtn: boolean;
    showBackBtn: boolean;
    showForwardBtn: boolean;
    visibleItems: any;

    @Input()
    items: any;
    @Input()
    itemsPerPage: number;

    @Output()
    visibleItemsChanged: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.numBtns = [];
        this.currentPage = 1;
        this.setPages();
    }

    setPages() {
        this.setNumBtns();
        this.setSkipBtns();
        this.setVisibleItems();
    }

    setVisibleItems() {
        this.visibleItems = [];
        var startingPoint = (this.itemsPerPage * (this.currentPage - 1));

        for(var index = startingPoint; index < startingPoint + this.itemsPerPage; index++)
        {
            if (index < this.items.length)
                this.visibleItems.push(this.items[index]);
        }

        this.visibleItemsChanged.emit(this.visibleItems);
    }

    setNumBtns() {
        var pageIndex = 1;
        var maxPageIndex = 5;
        this.numBtns = [];

        if (this.currentPage > 3)
        {
            pageIndex = this.currentPage - 2;
            maxPageIndex = pageIndex + 4;
        }

        if (this.currentPage == this.numPages - 1)
        {
            pageIndex = this.currentPage - 3;
            maxPageIndex = pageIndex + 4;
        }
        if (this.currentPage == this.numPages)
        {
            pageIndex = this.currentPage - 4;
            maxPageIndex = pageIndex + 4;
        }

        for (var index = (this.itemsPerPage * (pageIndex - 1)); index < this.items.length; index += this.itemsPerPage)
        {
            if (pageIndex <= maxPageIndex)
                this.numBtns.push(pageIndex);
            pageIndex++;
        }
        this.numPages = pageIndex - 1;
    }

    setSkipBtns() {
        //first page button
        if (this.currentPage == 1)
            this.showFirstPageBtn = false;
        if (this.currentPage > 1)
            this.showFirstPageBtn = true;

        //back button
        if (this.currentPage < 3)
            this.showBackBtn = false;
        if (this.currentPage >= 3)
            this.showBackBtn = true;

        //forward button
        if (this.currentPage >= this.numPages - 1)
            this.showForwardBtn = false;
        if (this.currentPage < this.numPages - 1) 
            this.showForwardBtn = true;

        //last page button
        if (this.currentPage == this.numPages)
            this.showLastPageBtn = false;
        if (this.currentPage < this.numPages)
            this.showLastPageBtn = true;
    }

    firstPage() {
        this.currentPage = 1;
        this.setPages();
    }

    lastPage() {
        this.currentPage = this.numPages;
        this.setPages();
    }

    moveForward() {
        this.currentPage += 1;
        this.setPages();
    }

    moveBack() {
        this.currentPage -= 1;
        this.setPages();
    }

    setPage(page: number) {
        this.currentPage = page;
        this.setPages();
    }
}