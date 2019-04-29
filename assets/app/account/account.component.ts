import { Component, OnInit } from "@angular/core";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})
export class AccountComponent{
    myuser: User;

    constructor(private userService: UserService) {}
}