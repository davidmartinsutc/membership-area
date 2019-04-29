import { Component, OnInit } from "@angular/core";
import { Coupdecoeur } from "../models/coupdecoeur.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { CoupdecoeurService } from "../services/coupdecoeur.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";


@Component({
    selector: 'app-admin-coupdecoeur',
    templateUrl: './admin-coupdecoeur.component.html'
})

export class AdminCoupdecoeurComponent implements OnInit {
    mycoupdecoeur: Coupdecoeur;
    uploadFile: File;
    coupdecoeurs: Coupdecoeur[];
    sections: Section[];
    selectedSections: Section[];


    constructor(private sectionService: SectionService, private coupdecoeurService: CoupdecoeurService) { }

    ngOnInit() {
        this.coupdecoeurService.coupdecoeurIsEdit.subscribe(
            (coupdecoeur: Coupdecoeur) => {
                this.mycoupdecoeur = coupdecoeur;
                this.showAddCoupdecoeur();
            }
        );

        this.sectionService.getAllSectionsByPositionAndWhatFor('produits')
            .subscribe(
            (sections: Section[]) => {
                this.sections = sections;
            }
            );
        this.selectedSections = [];

        this.coupdecoeurService.getCoupdecoeurs()
            .subscribe(
            (coupdecoeurs: Coupdecoeur[]) => {
                this.coupdecoeurs = coupdecoeurs;
            }
            );
    }


    onSubmit(addCoupdecoeurForm: NgForm) {
        if (this.mycoupdecoeur) {
            // Edit
            const oldCoupdecoeurName = addCoupdecoeurForm.value.oldCoupdecoeurName;
            this.mycoupdecoeur.name = addCoupdecoeurForm.value.name;
            if (addCoupdecoeurForm.value.picture) {
                this.mycoupdecoeur.picture = addCoupdecoeurForm.value.picture;
            }
            else {
                this.mycoupdecoeur.picture = this.mycoupdecoeur.picture;
            }
            this.mycoupdecoeur.video = addCoupdecoeurForm.value.video;
            this.mycoupdecoeur.description = addCoupdecoeurForm.value.description;
            this.mycoupdecoeur.second_title = addCoupdecoeurForm.value.second_title;
            this.mycoupdecoeur.link_to_aff = addCoupdecoeurForm.value.link_to_aff;
            this.mycoupdecoeur.link_to_noaff = addCoupdecoeurForm.value.link_to_noaff;
            this.mycoupdecoeur.image = this.uploadFile;
            this.mycoupdecoeur.sections = this.selectedSections;



            this.coupdecoeurService.update(this.mycoupdecoeur, oldCoupdecoeurName)
                .subscribe(
                data_coupdecoeurid => {
                    if (this.mycoupdecoeur.image) {
                        this.coupdecoeurService.addPicture(this.mycoupdecoeur, data_coupdecoeurid)
                            .subscribe();
                    }
                    this.mycoupdecoeur = null;
                },
                error => {
                    console.error(error);
                    this.mycoupdecoeur = null;
                }
                );

        } else {
            // Create
            const mycoupdecoeur = new Coupdecoeur(
                addCoupdecoeurForm.value.name,
                addCoupdecoeurForm.value.picture,
                addCoupdecoeurForm.value.description,
                this.selectedSections,
                this.uploadFile,
                addCoupdecoeurForm.value.video,
                addCoupdecoeurForm.value.second_title,
                null,
                addCoupdecoeurForm.value.link_to_aff,
                addCoupdecoeurForm.value.link_to_noaff
            );

            console.log(mycoupdecoeur);

            this.coupdecoeurService.addCoupdecoeur(mycoupdecoeur)
                .subscribe(
                data_coupdecoeurid => {
                    //this.sections.push(myproduct);
                    if (mycoupdecoeur.image) {
                        this.coupdecoeurService.addPicture(mycoupdecoeur, data_coupdecoeurid)
                            .subscribe();
                    }
                },
                error => console.error(error)
                );
        }
        addCoupdecoeurForm.resetForm();
        this.UncheckAll();

        this.uploadFile = null;
        document.getElementById("addProductDiv").style.display = "none";
    }

    onDelete(coupdecoeur: Coupdecoeur) {
        let r = confirm("Confirmer la supression ?");
        if (r == true) {
            this.coupdecoeurService.deleteCoupdecoeur(coupdecoeur)
                .subscribe(
                result => {
                    this.coupdecoeurs.splice(this.coupdecoeurs.indexOf(coupdecoeur), 1);
                });
        }
    }

    onEdit(coupdecoeur: Coupdecoeur) {
        this.coupdecoeurService.editCoupdecoeur(coupdecoeur);
    }



    addInSection(section: Section) {
        if (this.selectedSections.indexOf(section) < 0) {
            this.selectedSections.push(section);
        }
        else {
            this.selectedSections.splice(this.selectedSections.indexOf(section), 1);
        }
    }




    showAddCoupdecoeur() {
        var x = document.getElementById("addProductDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    fileChanged(file) {
        this.uploadFile = file.target.files[0];
    }

    UncheckAll() {
        var w = document.getElementsByTagName('input');
        for (var i = 0; i < w.length; i++) {
            if (w[i].type == 'checkbox') {
                w[i].checked = false;
            }
        }
    }
}