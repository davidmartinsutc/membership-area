import { Routes, RouterModule } from "@angular/router";

import { AdminUsersComponent } from "./admin-users.component";
import { AdminSectionsProduitsComponent } from "./admin-sectionsproduits.component";
import { AdminSectionsTrainingsComponent } from "./admin-sectionstrainings.component";
import { AdminProductComponent } from "./admin-product.component";
import { AdminTrainingComponent } from "./admin-training.component";
import { AdminNotificationsComponent } from "./admin-notifications.component";
import { AdminBonusComponent } from "./admin-bonus.component";
import { AdminLicencesComponent } from "./admin-licences.component";
import { AdminCoursOverviewComponent } from "./cours/admin-cours-overview.component";
import { AdminCoursEditorComponent } from "./cours/admin-cours-editor.component";
import { AdminBonusOverviewComponent } from "./bonus/admin-bonus-overview.component";
import { AdminBonusEditorComponent } from "./bonus/admin-bonus-editor.component";
import { AdminCoupdecoeurComponent } from "./admin-coupdecoeur.component";
import { AdminZapiermatchingComponent } from "./admin-zapiermatching.component";

const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'usermanaments', pathMatch: 'full' },
    { path: 'usermanaments', component: AdminUsersComponent },
    { path: 'sectionsproduits', component: AdminSectionsProduitsComponent },
    { path: 'sectionstrainings', component: AdminSectionsTrainingsComponent },
    { path: 'produits', component: AdminProductComponent },
    { path: 'formations', component: AdminTrainingComponent },
    { path: 'notifications', component: AdminNotificationsComponent },
    { path: 'bonus', component: AdminBonusComponent },
    { path: 'coupdecoeur', component: AdminCoupdecoeurComponent },
    { path: 'licences', component: AdminLicencesComponent },
    { path: 'coursoverview', component: AdminCoursOverviewComponent },
    { path: 'courseditor/:coursID', component: AdminCoursEditorComponent },
    { path: 'bonuspageoverview', component: AdminBonusOverviewComponent },
    { path: 'bonuspageeditor/:bonusPageID', component: AdminBonusEditorComponent },
    { path: 'zapiermatching', component: AdminZapiermatchingComponent }
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);