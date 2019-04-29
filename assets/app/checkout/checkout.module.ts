import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanierComponent } from "./panier.component";
import { PaiementComponent } from "./paiement.component";
import { ConfirmationComponent } from "./confirmation.component";
import { ErreurPaiementComponent } from "./erreur-paiement.component";

import { checkoutRouting } from "./checkout.routing";


@NgModule({
    declarations: [
        PanierComponent,
        PaiementComponent,
        ConfirmationComponent,
        ErreurPaiementComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        checkoutRouting
    ]
})
export class CheckoutModule {

}