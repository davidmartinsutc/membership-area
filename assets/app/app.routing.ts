import { Routes, CanActivate, RouterModule } from "@angular/router";

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminGuardService as AdminGuard } from './services/admin-guard.service';

import { MessagesComponent } from "./messages/messages.component";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { ProductsComponent } from "./products/products.component";
import { TrainingsComponent } from "./trainings/trainings.component";
import { MemberComponent } from "./member/member.component";
import { ResetPasswordComponent } from "./auth/reset-password.component";
import { ByeComponent } from "./bye.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { FirstVisitComponent } from "./auth/first-visit.component";
import { CommandesComponent } from "./commandes/commandes.component";
import { BonusComponent } from "./bonus/bonus.component";
import { ContactComponent } from "./contact/contact.component";
import { CoupdecoeurComponent } from "./coupdecoeur/coupdecoeur.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full'},
    { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'commandes', component: CommandesComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard], loadChildren: './account/account.module#AccountModule'},
    { path: 'smaltadmin', component: AdminComponent, canActivate: [AdminGuard], loadChildren: './admin/admin.module#AdminModule'},
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], loadChildren: './products/products.module#ProductsModule'},
    { path: 'trainings', component: TrainingsComponent, canActivate: [AuthGuard], loadChildren: './trainings/trainings.module#TrainingsModule'},
    { path: 'membre', component: MemberComponent, canActivate: [AuthGuard], loadChildren: './member/member.module#MemberModule'},
    { path: 'coupsdecoeur', component: CoupdecoeurComponent, canActivate: [AuthGuard], loadChildren: './coupdecoeur/coupdecoeur.module#CoupdecoeurModule'},
    { path: 'login', component: AuthComponent, loadChildren: './auth/auth.module#AuthModule'},
    { path: 'bonus', component: BonusComponent, loadChildren: './bonus/bonus.module#BonusModule'},
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'welcome', component: FirstVisitComponent },
    { path: 'bye', component: ByeComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], loadChildren: './checkout/checkout.module#CheckoutModule'},
    { path: '**', component: AccueilComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);