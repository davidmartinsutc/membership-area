import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
    myForm: FormGroup;
    myuser: User;

    constructor(private userService: UserService) { }


    ngOnInit() {

        const userId = localStorage.getItem('userId');

        if (this.userService.myuser) {
            this.myuser = this.userService.myuser;
        }
        else {
            this.userService.getUserInfoById(userId)
                .subscribe((user) => {
                    this.myuser = user;
                });
        }
    }

}