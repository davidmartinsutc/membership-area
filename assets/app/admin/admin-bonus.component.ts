import { Component, OnInit } from "@angular/core";
import { Bonus } from "../models/bonus.model";
import { BonusService } from "../services/bonus.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-bonus',
    templateUrl: './admin-bonus.component.html'
})

export class AdminBonusComponent implements OnInit {
    bonuses: Bonus[];
    dateetheure: Date;
    mybonus: Bonus;

    constructor(private bonusService: BonusService) { }

    ngOnInit() {

        this.bonusService.getAllBonus()
            .subscribe(
            (bonuses: Bonus[]) => {
                this.bonuses = bonuses;
            }
            );
    }

    onSubmit(addBonusForm: NgForm) {

        // Create
        const mybonus = new Bonus(
            new Date(),
            addBonusForm.value.bonus_content
        );

        this.bonusService.create(mybonus)
            .subscribe(
            data => {
                this.bonuses.push(mybonus);
            },
            error => console.error(error)
            );

            addBonusForm.resetForm();
    }


    bonusDelete(bonus: Bonus) {
        this.bonusService.deleteBonus(bonus)
            .subscribe(
            result => {
                this.bonuses.splice(this.bonuses.indexOf(bonus), 1);
            });
    }
}