import { Component, Inject, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AdminUser } from "./IAdminUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";
import { BryterPagingComponent } from "../../bryterpaging/bryterpaging.component";
import { BryterDropDownObject } from '../../bryterdropdown/bryterdropdown.component';
import { AdminUserType } from './IAdminUserType';
import { UserStatus } from '../IUserStatusEnum';

@Component({
    selector: 'adminUsersBasic',
    templateUrl: './adminUsersBasic.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './adminUsersBasic.component.css']
})

export class AdminUsersBasicComponent implements OnInit {
    @Output()
    showDetails: EventEmitter<string> = new EventEmitter();
    @Output()
    selectedAdminUserChange: EventEmitter<AdminUser> = new EventEmitter();

    @Input()
    selectedAdminUser: AdminUser

    public adminUsers: AdminUser[];
    public visibleAdminUsers: AdminUser[];
    public selectedAdminUserHeader: string;
    public adminUserTypeFilters: BryterDropDownObject[]
    public adminUserStatusFilters: BryterDropDownObject[]

    @ViewChild('createAdminUserOverlay') createAdminUserOverlay: JQueryPopupOverlay;
    @ViewChild('adminPaging') adminPaging: BryterPagingComponent;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.visibleAdminUsers = [];
        this.getAdminUsers();
        this.selectedAdminUser = this.getEmptyAdminUser();

        this.adminUserTypeFilters = [
            { name: "Select User Type...", value: -1 },
            { name: "Admin", value: (AdminUserType.Admin as number) },
            { name: "Development", value: (AdminUserType.Development as number) },
            { name: "IT", value: (AdminUserType.IT as number) },
            { name: "QA", value: (AdminUserType.QA as number) }
        ]

        this.adminUserStatusFilters = [
            { name: "Select Status...", value: -1 },
            { name: "Active", value: (UserStatus.Active as number) },
            { name: "Inactive", value: (UserStatus.Inactive as number) }
        ]
    }

    refresh() {
        this.getAdminUsers();
    }

    getAdminUsers() {
        this.http.get(this.baseUrl + 'AdminUser/GetAllAdminUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.adminUsers = result.json().data.adminUsers as AdminUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    getEmptyAdminUser() {
        return {
            userID: 0,
            username: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: "",
            adminUserTypeID: 0,
            title: "",
            statusID: 0,
            statusName: "",
            createdOn: new Date(),
            createdOnStr: "",
            adminUserTypeName: ""
        }
    }

    show() {
        this.selectedAdminUser = this.getEmptyAdminUser();
        this.selectedAdminUserHeader = "Create Admin User";

        this.createAdminUserOverlay.show();
    }

    edit(adminUser: AdminUser) {
        this.selectedAdminUserHeader = "Edit Admin User";
        this.selectedAdminUser = adminUser;
        this.createAdminUserOverlay.show();
    }

    delete(adminUser: AdminUser) {
        var confirmDelete = confirm("Are you sure you want to delete " + adminUser.username + "?");

        if (confirmDelete) {
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

    userClick(adminUser: AdminUser) {
        this.selectedAdminUserChange.emit(adminUser);
        this.showDetails.emit();
    }

    setAdminUserList(adminUserList: AdminUser[])
    {
        this.visibleAdminUsers = adminUserList;
    }

    setNonPagingAdminUserList(adminUserList: AdminUser[])
    {
        this.adminPaging.setItems(adminUserList);
    }
}