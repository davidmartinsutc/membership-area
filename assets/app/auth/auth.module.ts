import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from "./login.component";
import { ForgotPasswordComponent } from "./forgot-password.component";

import { authRouting } from "./auth.routing";
import { ApplicationPipes } from "../pipe/pipe.module"


@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        authRouting,
        ApplicationPipes
    ]
})

export class AuthModule {

}