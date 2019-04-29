import { Component, OnInit } from "@angular/core";
import { BonusService } from "../services/bonus.service";
import { Bonus } from "../models/bonus.model"

@Component({
    selector: 'app-products-all',
    templateUrl: './member-bonus.component.html'
})
export class MemberBonusComponent implements OnInit {

    bonuses: Bonus[];

    constructor(private bonusService: BonusService) { }

    ngOnInit() {
        this.bonusService.getAllBonus()
            .subscribe(
            (bonuses: Bonus[]) => {
                this.bonuses = bonuses;
            })
    };

}