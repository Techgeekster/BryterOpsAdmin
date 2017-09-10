import { Component, ElementRef, NgZone, AfterViewChecked, OnInit, PLATFORM_ID, Inject, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Http, Headers } from '@angular/http';

import 'jquery';
import 'croppie';

import 'bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'croppie',
    templateUrl: './croppie.component.html',
    styleUrls: ['../../../content/styles/croppie.css', '../../../content/styles/site.css', './croppie.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class Croppie implements OnInit {
    public content: string;

    @Input()
    croppedImage: any;

    @Output()
    imageResult: EventEmitter<string> = new EventEmitter();
    @Output()
    fileLoaded: EventEmitter<string> = new EventEmitter();

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef,
        private zone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        this.croppedImage = ($(this.el.nativeElement).find("#croppieImg") as any).croppie({
            enableExif: true,
            viewport: {
                width: 300,
                height: 300,
                type: 'circle'
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
    }

    update() {
        ($(this.el.nativeElement).find("#croppieImg") as any).croppie('bind');
    }

    bind(imageUrl: string) {
        this.croppedImage.croppie('bind', {
            url: imageUrl
        });
    }

    readFile(files: any) {
        var self = this;
        var reader = new FileReader();

        reader.onload = function (e: any) {
            $("#croppieWrapper").addClass('ready');
            self.croppedImage.croppie('bind', {
                url: e.target.result
            }).then(function () {
                self.fileLoaded.emit();
            });
        }

        reader.readAsDataURL(files[0]);
    }

    saveImage(actionURL: string, fileName: string, id: number, accessType: number) {
        var self = this;

        this.croppedImage.croppie('result', {
            type: 'base64',
            size: 'original',
            circle: true
        }).then(function (resp: any) {
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

            var params = new URLSearchParams();
            params.set('ImageBase64', resp);
            params.set('FileName', fileName);
            params.set('ID', id.toString());
            params.set('AccessType', accessType.toString());

            self.http.post(self.baseUrl + actionURL, params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        self.imageResult.emit(result.json().data.filePath);
                    }
                    else
                        console.error(result.json().message);
                }, error => console.error(error));
        });
    }
}