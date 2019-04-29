import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../models/user.model";

@Component({
    selector: 'app-reset',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    token: string;
    user: User;

    constructor(private userService: UserService, private router: Router) { }

    onSubmit() {

        if (this.resetForm.value.password == this.resetForm.value.passwordConfirm) {
        this.user = new User(this.resetForm.value.email.trim().toLowerCase(), this.resetForm.value.password)
        this.userService.resetPassword(this.user, this.token)
            .subscribe(
            data => {
                this.router.navigate(['login']);
            },
            error => console.error(error)
            )
        }
        else {
            document.getElementById('result').innerHTML="Les Mots de Passe de sont pas identiques"
        }
    }

    ngOnInit() {
        this.token = this.router.url.substring(this.router.url.indexOf("token=") + 6);

        this.resetForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required)
        });
    }

}