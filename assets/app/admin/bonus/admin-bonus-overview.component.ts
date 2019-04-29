import { Component, OnInit } from "@angular/core";
import { BonusPageService } from "../../services/bonusPage.service";
import { BonusPage } from "../../models/bonusPage/bonusPage.model";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-bonus-overview',
    templateUrl: './admin-bonus-overview.component.html'
})

export class AdminBonusOverviewComponent implements OnInit {
    //mysection: Section;
    bonusPages: BonusPage[];
    myBonusPage: BonusPage;


    constructor(private bonusPageService: BonusPageService) { }

    ngOnInit() {

        this.bonusPageService.getAllBonusPages()
            .subscribe(
            (bonusPages: BonusPage[]) => {
                this.bonusPages = bonusPages;
            }
            );
    }

    onSubmit(addBonusPageForm: NgForm) {

        // Create
        const myBonusPage = new BonusPage(
            addBonusPageForm.value.titre,
            addBonusPageForm.value.description,
        );
console.log(myBonusPage);
        this.bonusPageService.create(myBonusPage)
            .subscribe(
            data => {
                this.bonusPages.push(myBonusPage);
            },
            error => console.error(error)
            );
        addBonusPageForm.resetForm();
    }

    bonusPageDelete(bonusPage: BonusPage) {
        let r = confirm("Confirmer la supression ?");
        if (r == true) {
            this.bonusPageService.deleteBonusPage(bonusPage)
                .subscribe(
                result => {
                    this.bonusPages.splice(this.bonusPages.indexOf(bonusPage), 1);
                });
        }
    }

}