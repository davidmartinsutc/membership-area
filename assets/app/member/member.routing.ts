import { Routes, RouterModule } from "@angular/router";

import { MemberProductsComponent } from "./member-products.component";
import { MemberTrainingsComponent } from "./member-trainings.component";
import { MemberBonusComponent } from "./member-bonus.component";
import { MemberDashboardComponent } from "./member-dashboard.component";

const MEMBER_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: MemberDashboardComponent},
    { path: 'produits', component: MemberProductsComponent },
    { path: 'formations', component: MemberTrainingsComponent },
    { path: 'bonus', component: MemberBonusComponent },
    { path: '**', component: MemberDashboardComponent }
];

export const memberRouting = RouterModule.forChild(MEMBER_ROUTES);