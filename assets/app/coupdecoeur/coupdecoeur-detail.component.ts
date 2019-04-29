import { Component, OnInit } from "@angular/core";
import { Coupdecoeur } from "../models/coupdecoeur.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CoupdecoeurService } from "../services/coupdecoeur.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-coupdecoeur-detail',
    templateUrl: './coupdecoeur-detail.component.html'
})
export class CoupdecoeurDetailComponent implements OnInit {
    coupdecoeur: Coupdecoeur;


    constructor(private route: ActivatedRoute, private router: Router, private coupdecoeurService: CoupdecoeurService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {

    }

    initialisation() {
        const coupdecoeurName = this.route.snapshot.paramMap.get('detail');

        this.coupdecoeurService.getCoupdecoeurByName(coupdecoeurName)
            .subscribe(
            (coupdecoeurMap: Coupdecoeur) => {
                this.coupdecoeur = coupdecoeurMap;
                console.log(this.coupdecoeur);
            });
    };

}