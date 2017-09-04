import { Component, Inject, OnInit, NgZone, ElementRef, AfterViewChecked, ViewChild  } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AdminUser } from "./IAdminUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

@Component({
    selector: 'adminUsers',
    templateUrl: './adminUsers.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './adminUsers.component.css']
})

export class AdminUsersComponent implements OnInit {
    public adminUsers: AdminUser[];
    public selectedAdminUser: AdminUser;
    public selectedAdminUserHeader: string;
    @ViewChild('mypopup') mypopup: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private zone: NgZone,
        private el: ElementRef) { }

    ngOnInit() {
        this.getAdminUsers();

        this.selectedAdminUser = {
            userID: 0,
            username: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: "",
            adminUserTypeID: 0,
            title: ""
        }
    }

    refresh()
    {
        this.getAdminUsers();
    }

    getAdminUsers()
    {
        this.http.get(this.baseUrl + 'AdminUser/GetAllAdminUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUsers = result.json().data.adminUsers as AdminUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    show()
    {
        this.selectedAdminUser = {
            userID: 0,
            username: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: "",
            adminUserTypeID: 0,
            title: ""
        }
        this.selectedAdminUserHeader = "Create Admin User";

        this.mypopup.show();
    }

    edit(adminUser: AdminUser)
    {
        this.selectedAdminUserHeader = "Edit Admin User";
        this.selectedAdminUser = adminUser;
        this.mypopup.show();

        this.refresh();
        alert("Edit:\n" + JSON.stringify(adminUser, null, 4));
    }

    delete(adminUser: AdminUser)
    {
        var confirmDelete = confirm("Are you sure you want to delete " + adminUser.username + "?");

        if (confirmDelete)
        {
            let body = JSON.stringify(adminUser);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

            var params = new URLSearchParams();
            params.set('UserID', adminUser.userID.toString());

            this.http.post(this.baseUrl + 'AdminUser/DeleteAdminUser', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.adminUsers = result.json().data.adminUsers as AdminUser[];
                    }
                    else
                        console.error(result.json().message);
                }, error => console.error(error));

            this.refresh();
        }
    }
}

