import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { BonusPage } from "../models/bonusPage/bonusPage.model";
import { Bonus } from "../models/bonusPage/bonus.model";
import { BonusPageService } from "../services/bonusPage.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-bonus-detail',
    templateUrl: './bonus-detail.component.html'
})
export class BonusDetailComponent implements OnInit {
    bonusPage: BonusPage;
    bonus: Bonus;

    constructor(private route: ActivatedRoute, private router: Router, private bonusPageService: BonusPageService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {
    }

    initialisation() {
        const bonusPageID = this.route.snapshot.paramMap.get('bonusPageID');
        console.log(bonusPageID)

        this.bonusPageService.getBonusPageById(bonusPageID)
            .subscribe((bonusPage: BonusPage) => {
                this.bonusPage = bonusPage;
                console.log(this.bonusPage)
            });
    };

}