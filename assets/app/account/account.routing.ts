import { Routes, RouterModule } from "@angular/router";

import { DisplayComponent } from "./display.component";
import { ModifComponent } from "./modif.component";

const ACCOUNT_ROUTES: Routes = [
    { path: '', redirectTo: 'display', pathMatch: 'full' },
    { path: 'display', component: DisplayComponent },
    { path: 'modif', component: ModifComponent }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);