import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import * as $ from 'jquery';
import 'jquery-popup-overlay';

import 'bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'jqueryPopupOverlay',
    templateUrl: './jquerypopupoverlay.component.html',
    styleUrls: ['../../../content/styles/site.css', './jquerypopupoverlay.component.css'],
})

export class JQueryPopupOverlay implements AfterViewChecked {
    public content: string;

    constructor(private el: ElementRef, private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngAfterViewChecked() {
        console.log(this.platformId);
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
        this.popup('hide');
    }

    private popup(command?: string) {
        ($(this.el.nativeElement) as any).popup(command);
    }
}