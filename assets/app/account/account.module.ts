import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisplayComponent } from "./display.component";
import { ModifComponent } from "./modif.component";
import { accountRouting } from "./account.routing";

@NgModule({
    declarations: [
        DisplayComponent,
        ModifComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        accountRouting
    ]
})
export class AccountModule {

}