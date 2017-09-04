import { Component, Inject, OnInit, ElementRef, ViewChild  } from '@angular/core';
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
    @ViewChild('createAdminUserOverlay') createAdminUserOverlay: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.getAdminUsers();

        this.selectedAdminUser = this.getEmptyAdminUser();
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

    getEmptyAdminUser()
    {
        return {
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

    show()
    {
        this.selectedAdminUser = this.getEmptyAdminUser();
        this.selectedAdminUserHeader = "Create Admin User";

        this.createAdminUserOverlay.show();
    }

    edit(adminUser: AdminUser)
    {
        this.selectedAdminUserHeader = "Edit Admin User";
        this.selectedAdminUser = adminUser;
        this.createAdminUserOverlay.show();
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

