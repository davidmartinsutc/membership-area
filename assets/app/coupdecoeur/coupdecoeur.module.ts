import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoupdecoeurAllComponent } from "./coupdecoeur-all.component";
import { CoupdecoeurDetailComponent } from "./coupdecoeur-detail.component";

import { ApplicationPipes } from "../pipe/pipe.module"

import { coupdecoeurRouting } from "./coupdecoeur.routing";

@NgModule({
    declarations: [
        CoupdecoeurAllComponent,
        CoupdecoeurDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        coupdecoeurRouting,
        ApplicationPipes
    ]
})

export class CoupdecoeurModule {

}