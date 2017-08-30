import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent {
    public users: User[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'Users/GetAllUsers')
            .subscribe(result => {
                if (result.json().success) {
                    this.users = result.json().data.users as User[];
                }
                else
                    console.error(result.json().message);
        }, error => console.error(error));
    }
}

interface User {
    userID: number,
    username: string;
}