import { Component, Inject, OnInit, NgZone, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'adminUsers',
    templateUrl: './adminUsers.component.html',
    styleUrls: ['./adminUsers.component.css']
})

export class AdminUsersComponent implements OnInit {
    public adminUsers: AdminUser[];
    @ViewChild('mypopup') mypopup: ElementRef;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private zone: NgZone,
        private el: ElementRef
                /*, @Inject('JqueryService') $: JQueryStatic*/) {

        // Initialize the plugin
        //($('#my_popup') as any).popup();
    }

    ngOnInit() {
        this.http.get(this.baseUrl + 'AdminUser/GetAllAdminUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUsers = result.json().data.adminUsers as AdminUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    //ngAfterViewChecked() {
    //    this.zone.runOutsideAngular(() => {
    //        console.log('running outside angular', $('#my_popup'));
    //        console.log(($("#my_popup", this.el.nativeElement) as any).popup());
    //    });
    //}
}

interface AdminUser {
    userID: number,
    username: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    adminUserTypeID: number;
    title: string;
}