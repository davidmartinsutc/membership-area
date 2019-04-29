import { Routes, RouterModule } from "@angular/router";

import { BonusDetailComponent } from "./bonus-detail.component";

const BONUS_ROUTES: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: ':bonusPageID', component: BonusDetailComponent }
];

export const bonusRouting = RouterModule.forChild(BONUS_ROUTES);