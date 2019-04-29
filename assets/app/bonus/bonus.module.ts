import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusDetailComponent } from "./bonus-detail.component";
import { bonusRouting } from "./bonus.routing";


@NgModule({
    declarations: [
        BonusDetailComponent
    ],
    imports: [
        CommonModule,
        bonusRouting
    ]
})
export class BonusModule {
    
}