import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminUsersComponent } from "./admin-users.component";
import { AdminSectionsProduitsComponent } from "./admin-sectionsproduits.component";
import { AdminSectionsTrainingsComponent } from "./admin-sectionstrainings.component";
import { AdminProductComponent } from "./admin-product.component";
import { AdminTrainingComponent } from "./admin-training.component";
import { AdminNotificationsComponent } from "./admin-notifications.component";
import { AdminBonusComponent } from "./admin-bonus.component";
import { ModalBoxComponent } from "./modalbox/modalbox.component";
import { ModalBoxLicencesComponent } from "./modalbox-licences/modalbox-licences.component";
import { AdminLicencesComponent } from "./admin-licences.component";
import { AdminCoursOverviewComponent } from "./cours/admin-cours-overview.component";
import { AdminCoursEditorComponent } from "./cours/admin-cours-editor.component";
import { AdminBonusOverviewComponent } from "./bonus/admin-bonus-overview.component";
import { AdminBonusEditorComponent } from "./bonus/admin-bonus-editor.component";
import { AdminCoupdecoeurComponent } from "./admin-coupdecoeur.component";
import { AdminZapiermatchingComponent } from "./admin-zapiermatching.component";

import { adminRouting } from "./admin.routing";
import { ModalBoxService } from './modalbox/modalbox.service';
import { ModalBoxLicencesService } from './modalbox-licences/modalbox-licences.service';

@NgModule({
    declarations: [
        AdminUsersComponent,
        AdminSectionsProduitsComponent,
        AdminSectionsTrainingsComponent,
        AdminProductComponent,
        AdminTrainingComponent,
        AdminNotificationsComponent,
        AdminBonusComponent,
        AdminLicencesComponent,
        ModalBoxComponent,
        ModalBoxLicencesComponent,
        AdminCoursOverviewComponent,
        AdminCoursEditorComponent,
        AdminBonusOverviewComponent,
        AdminBonusEditorComponent,
        AdminCoupdecoeurComponent,
        AdminZapiermatchingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        adminRouting
    ],
    providers: [ModalBoxService, ModalBoxLicencesService],

})
export class AdminModule {

}