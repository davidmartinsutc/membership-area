import { Routes, RouterModule } from "@angular/router";

import { CoupdecoeurAllComponent } from "./coupdecoeur-all.component";
import { CoupdecoeurDetailComponent } from "./coupdecoeur-detail.component";

const COUPDECOEUR_ROUTES: Routes = [
    { path: '', component: CoupdecoeurAllComponent, pathMatch: 'full' },
    { path: ':detail', component: CoupdecoeurDetailComponent },
    { path: '**', component: CoupdecoeurAllComponent }
];

export const coupdecoeurRouting = RouterModule.forChild(COUPDECOEUR_ROUTES);