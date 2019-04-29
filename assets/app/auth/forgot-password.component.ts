import { Component } from "@angular/core";
import { UserService } from "../services/user.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../models/user.model";

@Component({
    selector: 'app-login',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
    forgotForm: FormGroup;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.forgotForm = new FormGroup({
            email: new FormControl(null)
        });
    }

    onSubmit() {

        document.getElementById('message').innerHTML='Veuillez Patienter'

        this.userService.forgotPassword(this.forgotForm.value.email.trim().toLowerCase())
            .subscribe(
            data => {
                //innerHtml pour indiquer si la reinitialisaition est ok ou non
                document.getElementById('message').innerHTML='Un email vous a été envoyé'
            },
            error => console.error(error)
            )
    }
}