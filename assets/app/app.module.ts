import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageModule } from "./messages/message.module";

import { AppComponent } from "./app.component";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth.component";

import { HomeComponent } from "./home.component";
import { ErrorComponent } from "./errors/error.component";
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

import { UserService } from "./services/user.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { AdminGuardService } from './services/admin-guard.service';
import { SectionService } from "./services/section.service";
import { ProductService } from "./services/product.service";
import { NotificationService } from "./services/notification.service";
import { BonusService } from "./services/bonus.service";
import { ErrorService } from "./errors/error.service";
import { CoursService } from './services/cours.service';
import { BonusPageService } from './services/bonusPage.service';
import { PanierService } from './services/panier.service';
import { CommandeService } from "./services/commande.service";
import { EmailSenderService } from "./services/emailsender.service";
import { CoupdecoeurService } from "./services/coupdecoeur.service";
import { ZapiermatchingService } from "./services/zapiermatching.service";


import { ApplicationPipes } from "./pipe/pipe.module"

import { routing } from "./app.routing";


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        ErrorComponent,
        AccountComponent,
        AdminComponent,
        AccueilComponent,
        ProductsComponent,
        TrainingsComponent,
        MemberComponent,
        ResetPasswordComponent,
        ByeComponent,
        CheckoutComponent,
        FirstVisitComponent,
        CommandesComponent,
        BonusComponent,
        ContactComponent,
        CoupdecoeurComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        MessageModule,
        FormsModule,
        ReactiveFormsModule,
        ApplicationPipes
    ],
    providers: [AuthGuardService, AdminGuardService, ErrorService, UserService, SectionService, ProductService, NotificationService, BonusService, CoursService, PanierService, CommandeService, BonusPageService, EmailSenderService, CoupdecoeurService, ZapiermatchingService],
    bootstrap: [AppComponent]
})
export class AppModule {

}