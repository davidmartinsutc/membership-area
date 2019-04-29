import { Component, OnInit } from "@angular/core";
import { CoursService } from "../../services/cours.service";
import { Cours } from "../../models/cours/cours.model";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-cours-overview',
    templateUrl: './admin-cours-overview.component.html'
})

export class AdminCoursOverviewComponent implements OnInit {
    //mysection: Section;
    mycourse: Cours;
    courses: Cours[];


    constructor(private coursService: CoursService) { }

    ngOnInit() {


        this.coursService.getAllCours()
            .subscribe(
            (cours: Cours[]) => {
                this.courses = cours;
            }
            );
    }

    onSubmit(addCoursForm: NgForm) {

        // Create
        const mycours = new Cours(
            addCoursForm.value.titre,
            addCoursForm.value.lien,
            addCoursForm.value.description
        );
        this.coursService.create(mycours)
            .subscribe(
            data => {
                this.courses.push(mycours);
            },
            error => console.error(error)
            );
        addCoursForm.resetForm();
    }

    coursDelete(cours: Cours) {
        let r = confirm("Confirmer la supression ?");
        if (r == true) {
            this.coursService.deleteCours(cours)
                .subscribe(
                result => {
                    this.courses.splice(this.courses.indexOf(cours), 1);
                });
        }
    }

    coursEdit(cours: Cours) {
        console.log('on edit')
    }



}