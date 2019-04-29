import { Component, OnInit } from "@angular/core";
import { Coupdecoeur } from "../models/coupdecoeur.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { CoupdecoeurService } from "../services/coupdecoeur.service";
import { SectionCounter } from "../models/sectioncounter.model";


@Component({
    selector: 'app-coupdecoeur-all',
    templateUrl: './coupdecoeur-all.component.html'
})
export class CoupdecoeurAllComponent implements OnInit {

    coupdecoeurs: Coupdecoeur[] = [];        //Ce produit est une formation
    allcoupdecoeurs: Coupdecoeur[] = [];
    sectionCount: SectionCounter[] = []; //Sert à compter l'occurence de chaque section
    loader = true;



    constructor(private sectionService: SectionService, private coupdecoeurService: CoupdecoeurService) { }

    ngOnInit() {

        this.coupdecoeurService.getCoupdecoeurs()
            .subscribe(
            (coupdecoeurs: Coupdecoeur[]) => {
                coupdecoeurs.map(coupdecoeurMap => {                      //On regarde tous les products
                    this.allcoupdecoeurs.push(coupdecoeurMap);
                    coupdecoeurMap.sections.map(sectionMap => {     //On Map pour ajouter dans la liste des section
                        var dejaPresent = false;
                        this.sectionCount.map(SectionCounterMap => {
                            if (SectionCounterMap.section.sectionName == sectionMap.sectionName) {
                                dejaPresent = true;
                                SectionCounterMap.nb = SectionCounterMap.nb + 1;
                            }
                        })

                        if (!dejaPresent) {
                            this.sectionCount.push(new SectionCounter(sectionMap, 1))
                        }

                    })

                    this.loader = false;
                })
                if (this.allcoupdecoeurs.length == 0) this.loader = false;
                this.coupdecoeurs = this.allcoupdecoeurs;
            })

    };

    sectionFilter(section: any) {
        if (section == 'all') {
            this.coupdecoeurs = this.allcoupdecoeurs;
        }
        else {
            var coupdecoeursFiltered = [];
            this.coupdecoeurs = this.allcoupdecoeurs;
            this.coupdecoeurs.map(coupdecoeurMap => {
                if ((coupdecoeurMap.sections.filter(sectionMap => sectionMap.sectionID == section.sectionID)).length > 0) {
                    coupdecoeursFiltered.push(coupdecoeurMap);
                }
            });
            this.coupdecoeurs = coupdecoeursFiltered;
            //this.products = [];
        }
    }

}