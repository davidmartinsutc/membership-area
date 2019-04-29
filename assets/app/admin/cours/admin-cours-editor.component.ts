import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Cours } from "../../models/cours/cours.model";
import { Chapitre } from "../../models/cours/chapitre.model";
import { SousChapitre } from "../../models/cours/sous-chapitre.model";

import { NgForm } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import { CoursService } from "../../services/cours.service";

@Component({
    selector: 'app-admin-cours-editor',
    templateUrl: './admin-cours-editor.component.html'
})

export class AdminCoursEditorComponent implements OnInit {
    cours: Cours;
    chapitre: Chapitre;
    souschapitre: SousChapitre;

    constructor(private route: ActivatedRoute, private router: Router, private coursService: CoursService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {
    }

    initialisation() {
        const coursID = this.route.snapshot.paramMap.get('coursID');
        console.log(coursID)

        this.coursService.getCoursById(coursID)
            .subscribe((coursMap: Cours) => {
                this.cours = coursMap;
            });

    };

    onUpdateCours(updateCoursForm: NgForm) {
        this.cours.titre = updateCoursForm.value.titre;
        this.cours.lien = updateCoursForm.value.lien;
        this.cours.description = updateCoursForm.value.description;

        var changes = (<HTMLInputElement>document.getElementById('validationOK'));
        this.coursService.updateCours(this.cours).subscribe(
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

    onAddChapitre(addChapitreForm: NgForm) {
        let chapitre = new Chapitre(addChapitreForm.value.titre,
            [],
            addChapitreForm.value.numero,
            addChapitreForm.value.description)

        this.cours.chapitres.push(chapitre);

        this.coursService.updateCours(this.cours).subscribe(
            data => {
                console.log('okay')
                addChapitreForm.resetForm();
            },
            error => console.log('pas okay')
        );
    }

    onAddSousChapitre(addSousChapitreForm: NgForm, chapitre: Chapitre) {
        let sousChapitre = new SousChapitre(
            addSousChapitreForm.value.titre,
            addSousChapitreForm.value.texte,
            addSousChapitreForm.value.video,
            addSousChapitreForm.value.numero,
            addSousChapitreForm.value.duree)

        chapitre.sousChapitres.push(sousChapitre);

        this.coursService.updateCours(this.cours).subscribe(
            data => {
                console.log('okay')
                addSousChapitreForm.resetForm();
            },
            error => console.log('pas okay')
        );
    }

    onEditAll() {
        var changes = (<HTMLInputElement>document.getElementById('changesOK'));
        this.coursService.updateCours(this.cours).subscribe(
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


    onDeleteChapitre(chapitre: Chapitre) {
        this.cours.chapitres.splice(this.cours.chapitres.indexOf(chapitre), 1);

        var changes = (<HTMLInputElement>document.getElementById('changesOK'));
        this.coursService.updateCours(this.cours).subscribe(
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

    onDeleteSousChapitre(chapitre: Chapitre, sousChapitreCur: SousChapitre) {

        chapitre.sousChapitres.splice(chapitre.sousChapitres.indexOf(sousChapitreCur), 1);

        console.log(chapitre)
        var changes = (<HTMLInputElement>document.getElementById('changesSousChapitreOK'));
        this.coursService.updateCours(this.cours).subscribe(
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

    onEditChapitre(editChapitreForm: NgForm, chapitre: Chapitre) {
        var changes = (<HTMLInputElement>document.getElementById('changesOK'));

        chapitre.titre = editChapitreForm.value.titre;
        chapitre.numero = editChapitreForm.value.numero;
        chapitre.description = editChapitreForm.value.description;

        this.coursService.updateCours(this.cours).subscribe(
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

    onEditSousChapitre(editSousChapitreForm: NgForm, souschapitre: SousChapitre) {
        var changes = (<HTMLInputElement>document.getElementById('changesSousChapitreOK'));
        souschapitre.numero = editSousChapitreForm.value.numero;
        souschapitre.texte = editSousChapitreForm.value.texte;
        souschapitre.titre = editSousChapitreForm.value.titre;
        souschapitre.video = editSousChapitreForm.value.video;
        souschapitre.duree = editSousChapitreForm.value.duree;

        console.log(souschapitre)
        
        this.coursService.updateCours(this.cours).subscribe(
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

    onToggle(chapitre: Chapitre) {
        var toToggle = (<HTMLInputElement>document.getElementById(chapitre.titre));
        var arrowToggle = (<HTMLInputElement>document.getElementById(chapitre.titre+'arrow'));
        if (toToggle.style.display === "none") {
            toToggle.style.display = "block";
            arrowToggle.innerHTML='<i class="fa fa-arrow-down fa-fw"></i>'
        } else {
            toToggle.style.display = "none";
            arrowToggle.innerHTML='<i class="fa fa-arrow-right fa-fw"></i>'
        }
    }
}