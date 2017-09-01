import { Component, ElementRef, NgZone, AfterViewChecked, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
    selector: 'jqueryPopupOverlay',
    template: '<ng-content></ng-content>'
})

export class JQueryPopupOverlay implements AfterViewChecked {
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
    }

    close() {
        this.popup('hide');
    }

    private popup(command?: string) {
        ($(this.el.nativeElement) as any).popup(command);
    }
}