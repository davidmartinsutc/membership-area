import { Routes, RouterModule } from "@angular/router";

import { PanierComponent } from "./panier.component";
import { PaiementComponent } from "./paiement.component";
import { ConfirmationComponent } from "./confirmation.component";
import { ErreurPaiementComponent } from "./erreur-paiement.component";

const CHECKOUT_ROUTES: Routes = [
    { path: '', redirectTo: 'cart', pathMatch: 'full'},
    { path: 'cart', component: PanierComponent, pathMatch: 'full' },
    { path: 'payment', component: PaiementComponent, pathMatch: 'full' },
    { path: 'confirm', component: ConfirmationComponent, pathMatch: 'full' },
    { path: 'erreur/:message', component: ErreurPaiementComponent, pathMatch: 'full' }
];

export const checkoutRouting = RouterModule.forChild(CHECKOUT_ROUTES);