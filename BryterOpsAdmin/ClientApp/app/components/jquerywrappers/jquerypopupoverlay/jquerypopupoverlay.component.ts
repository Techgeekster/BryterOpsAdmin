import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import 'jquery';
import 'jquery-popup-overlay';

import 'bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'jqueryPopupOverlay',
    templateUrl: './jquerypopupoverlay.component.html',
    styleUrls: ['../../../content/styles/site.css', './jquerypopupoverlay.component.css'],
})

export class JQueryPopupOverlay implements AfterViewChecked {
    public content: string;

    @Output()
    closed: EventEmitter<string> = new EventEmitter();

    constructor(private el: ElementRef,
        private zone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewChecked() {
        if (isPlatformServer(this.platformId))
            return;

        this.zone.runOutsideAngular(() => {
            this.popup();
        });
    }

    show() {
        this.popup('show');
        var element = this.el.nativeElement;
        setTimeout(function () {
            $($(element).find('input')[0]).focus();
        }, 200);
    }

    close() {
        this.closed.emit();
        this.popup('hide');
    }

    private popup(command?: string) {
        ($(this.el.nativeElement) as any).popup(command);
    }
}