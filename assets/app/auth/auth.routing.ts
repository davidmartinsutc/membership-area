import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { ForgotPasswordComponent } from "./forgot-password.component";

const AUTH_ROUTES: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full'},
    { path: 'forgotpassword', component: ForgotPasswordComponent },
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);