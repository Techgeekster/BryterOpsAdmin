import { Component, ElementRef, NgZone, AfterViewChecked, OnInit, PLATFORM_ID, Inject, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { JQueryPopupOverlay } from '../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component';
import { CroppieComponent } from '../../jquerywrappers/croppie/croppie.component';
import { UserAccessType } from '../IUserAccessTypeEnum';

import 'bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'profileImage',
    templateUrl: './profileImage.component.html',
    styleUrls: ['../../../content/styles/site.css', './profileImage.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class ProfileImage implements OnInit {
    public content: string;
    public imageResult: string;

    @Input()
    userAccessTypeID: number;
    @Input()
    userAccessTypeName: string;
    @Input()
    profileID: number;

    @ViewChild('updateProfileImageOverlay') updateProfileImageOverlay: JQueryPopupOverlay;
    @ViewChild('croppieElement') croppieElement: CroppieComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef,
        private zone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        var self = this;
        $(self.el.nativeElement).find('#uploadProfileImage').on('change', function (newValue) {
            self.readFile(newValue.delegateTarget);
        });

        this.getProfileImage();
    }

    getProfileImage() {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new URLSearchParams();
        params.set('ID', this.profileID.toString());
        params.set('AccessType', this.userAccessTypeID.toString());

        //this.imageResult = "https://bryteropsblobs.blob.core.windows.net/publicimages/ProfileImage-Default.png";
        this.http.post(this.baseUrl + 'Image/GetProfileImage', params.toString(), { headers: headers })
            .subscribe(result => {
                if (result.json().success) {
                    this.imageResult = result.json().data.profileImage != null ? result.json().data.profileImage.profileImageBase64 : "";
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    show() {
        var self = this;
        this.croppieElement.bind(this.imageResult);
        this.updateProfileImageOverlay.show();
        
        setTimeout(function () {
            self.croppieElement.update();
        }, 100);
    }

    close() {
        this.updateProfileImageOverlay.close();
    }

    rotate(degree: number)
    {
        var width = ($(this.el.nativeElement).find("#profileImage") as any).width();
        var height = ($(this.el.nativeElement).find("#profileImage") as any).height();
        this.croppieElement.rotate(degree, width, height);
    }

    readFile(input: any) {
        if (input.files && input) 
            this.croppieElement.readFile(input.files);
        else 
            alert("Sorry - you're browser doesn't support the FileReader API");
    }

    fileLoaded()
    {
        $(".submit").css("display", "block");
    }

    saveProfileImage() {
        this.croppieElement.saveImage("Image/SaveProfileImage", "ProfileImage-" + this.userAccessTypeName + "-" + this.profileID + ".png", this.profileID, this.userAccessTypeID as number);
        this.updateProfileImageOverlay.close();
    }

    getImageResult(imageResultURL: string)
    {
        this.imageResult = imageResultURL;
    }
}