import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {
    myForm: FormGroup;
    myuser: User;

    constructor(private userService: UserService) {}

    onSubmit() {
    }


    ngOnInit() {
        this.myuser = this.userService.myuser;

        
        const userId = localStorage.getItem('userId');
        
        this.userService.getUserInfoById(userId)
        .subscribe((user) => {
            this.myuser = user;
        });
        
    }

}