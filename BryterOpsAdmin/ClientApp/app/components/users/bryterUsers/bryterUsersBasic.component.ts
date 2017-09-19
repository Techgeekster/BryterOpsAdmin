import { Component, Inject, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BryterUser } from "./IBryterUser";
import { JQueryPopupOverlay } from "../../jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component";

@Component({
    selector: 'bryterUsersBasic',
    templateUrl: './bryterUsersBasic.component.html',
    styleUrls: ['../../../content/styles/bootstrap.css', '../../../content/styles/site.css', './bryterUsersBasic.component.css']
})

export class BryterUsersBasicComponent implements OnInit {
    @Output()
    showDetails: EventEmitter<string> = new EventEmitter();
    @Output()
    selectedBryterUserChange: EventEmitter<BryterUser> = new EventEmitter();

    @Input()
    selectedBryterUser: BryterUser

    public bryterUsers: BryterUser[];
    public visibleBryterUsers: BryterUser[];
    public selectedBryterUserHeader: string;
    @ViewChild('createBryterUserOverlay') createBryterUserOverlay: JQueryPopupOverlay;

    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string,
        private el: ElementRef) { }

    ngOnInit() {
        this.getBryterUsers();
        this.selectedBryterUser = this.getEmptyBryterUser();
    }

    refresh() {
        this.getBryterUsers();
    }

    getBryterUsers() {
        this.http.get(this.baseUrl + 'BryterUser/GetAllBryterUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.bryterUsers = result.json().data.bryterUsers as BryterUser[];
                }
                else
                    console.error(result.json().message);
            }, error => console.error(error));
    }

    getEmptyBryterUser() {
        return {
            userID: 0,
            username: "",
            companyName: "",
            companyID: 0,
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: 0,
            country: "",
            title: "",
            experienceLevel: "",
            managerName: "",
            managerPhone: 0,
            managerEmail: "",
            phone: 0,
            email: "",
            rating: "",
            photo: "",
            yearsWithCompany: 0,
            approvalRate: 0,
            completionRate: 0,
            retainingRate: 0,
            assignedCityLicenseIDs: "",
            statusID: 0,
            statusName: "",
            createdOn: new Date(),
            createdOnStr: "",
            bryterUserTypeID: 0,
            bryterUserTypeName: ""
        };
    }

    show() {
        this.selectedBryterUser = this.getEmptyBryterUser();
        this.selectedBryterUserHeader = "Create Bryter User";

        this.createBryterUserOverlay.show();
    }

    edit(bryterUser: BryterUser) {
        this.selectedBryterUserHeader = "Edit Bryter User";
        this.selectedBryterUser = bryterUser;
        this.createBryterUserOverlay.show();
    }

    delete(bryterUser: BryterUser) {
        var confirmDelete = confirm("Are you sure you want to delete " + bryterUser.username + "?");

        if (confirmDelete) {
            let body = JSON.stringify(bryterUser);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

            var params = new URLSearchParams();
            params.set('UserID', bryterUser.userID.toString());

            this.http.post(this.baseUrl + 'BryterUser/DeleteBryterUser', params.toString(), { headers: headers })
                .subscribe(result => {
                    if (result.json().success) {
                        this.bryterUsers = result.json().data.bryterUsers as BryterUser[];
                    }
                    else
                        console.error(result.json().message);
                }, error => console.error(error));

            this.refresh();
        }
    }

    userClick(bryterUser: BryterUser) {
        this.selectedBryterUserChange.emit(bryterUser);
        this.showDetails.emit();
    }

    setBryterUserList(bryterUserList: BryterUser[]) {
        this.visibleBryterUsers = bryterUserList;
    }
}