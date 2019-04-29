import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MemberProductsComponent } from "./member-products.component";
import { MemberTrainingsComponent } from "./member-trainings.component";
import { MemberBonusComponent } from "./member-bonus.component";
import { MemberDashboardComponent } from "./member-dashboard.component";

import { ApplicationPipes } from "../pipe/pipe.module"

import { memberRouting } from "./member.routing";

@NgModule({
    declarations: [
        MemberProductsComponent,
        MemberTrainingsComponent,
        MemberBonusComponent,
        MemberDashboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        memberRouting,
        ApplicationPipes
    ]
})

export class MemberModule {

}