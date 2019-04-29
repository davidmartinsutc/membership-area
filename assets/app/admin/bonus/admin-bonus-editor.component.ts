import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BonusPage } from "../../models/bonusPage/bonusPage.model";
import { Bonus } from "../../models/bonusPage/bonus.model";
import { BonusPageService } from "../../services/bonusPage.service";

import { NgForm } from "@angular/forms";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-admin-bonus-editor',
    templateUrl: './admin-bonus-editor.component.html'
})

export class AdminBonusEditorComponent implements OnInit {
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

    onUpdateBonusPage(updateBonusPageForm: NgForm) {
        this.bonusPage.titre = updateBonusPageForm.value.titre;
        this.bonusPage.description = updateBonusPageForm.value.description;

        var changes = (<HTMLInputElement>document.getElementById('validationOK'));
        this.bonusPageService.updateBonusPage(this.bonusPage).subscribe(
            data => {
                console.log('okay');
                changes.innerHTML = "Changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;";
                }, 3000);
            },
            error => {
                console.log('pas okay')
                changes.innerHTML = "Erreur changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;";
                }, 3000);
            }
        );
    }

    onAddBonus(addBonusForm: NgForm) {
        let bonus = new Bonus(addBonusForm.value.titre,
            addBonusForm.value.image,
            addBonusForm.value.description,
            addBonusForm.value.downloadLink)

        this.bonusPage.bonus.push(bonus);

        this.bonusPageService.updateBonusPage(this.bonusPage).subscribe(
            data => {
                console.log('okay')
                addBonusForm.resetForm();
            },
            error => console.log('pas okay')
        );
    }

    onEditAll() {
        var changes = (<HTMLInputElement>document.getElementById('changesOK'));
        this.bonusPageService.updateBonusPage(this.bonusPage).subscribe(
            data => {
                console.log('okay');
                changes.innerHTML = "Changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;";
                }, 3000);
            },
            error => {
                console.log('pas okay')
                changes.innerHTML = "Erreur Changements"
            }
        );
    }


    onDeleteBonus(bonus: Bonus) {
        this.bonusPage.bonus.splice(this.bonusPage.bonus.indexOf(bonus), 1);

        var changes = (<HTMLInputElement>document.getElementById('changesOK'));
        this.bonusPageService.updateBonusPage(this.bonusPage).subscribe(
            data => {
                console.log('okay');
                changes.innerHTML = "Changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;";
                }, 3000);
            },
            error => {
                console.log('pas okay')
                changes.innerHTML = "Erreur changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;";
                }, 3000);
            }
        );
    }


    onEditBonus(editBonusForm: NgForm, bonus: Bonus) {
        var changes = (<HTMLInputElement>document.getElementById('changesOK'));

        bonus.titre = editBonusForm.value.titre;
        bonus.image = editBonusForm.value.image;
        bonus.description = editBonusForm.value.description;
        bonus.downloadLink = editBonusForm.value.downloadLink;

        this.bonusPageService.updateBonusPage(this.bonusPage).subscribe(
            data => {
                console.log('okay');
                changes.innerHTML = "Changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;"
                }, 3000);
            },
            error => {
                console.log('pas okay')
                changes.innerHTML = "Erreur changements OK";
                setTimeout(function () {
                    changes.innerHTML = "&nbsp;"
                }, 3000);
            }
        );
    }


    onToggle(bonusPage: BonusPage) {
        var toToggle = (<HTMLInputElement>document.getElementById(bonusPage.titre));
        var arrowToggle = (<HTMLInputElement>document.getElementById(bonusPage.titre + 'arrow'));
        if (toToggle.style.display === "none") {
            toToggle.style.display = "block";
            arrowToggle.innerHTML = '<i class="fa fa-arrow-down fa-fw"></i>'
        } else {
            toToggle.style.display = "none";
            arrowToggle.innerHTML = '<i class="fa fa-arrow-right fa-fw"></i>'
        }
    }
}