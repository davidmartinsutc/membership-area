import { Component, OnInit } from "@angular/core";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-sectionstrainings',
    templateUrl: './admin-sectionstrainings.component.html'
})

export class AdminSectionsTrainingsComponent implements OnInit {
    sections: Section[];
    mysection: Section;


    constructor(private sectionService: SectionService) {}

    ngOnInit() {

        this.sectionService.sectionIsEdit.subscribe(
            (section: Section) => this.mysection = section
        );

        this.sectionService.getAllSectionsByPositionAndWhatFor('trainings')
            .subscribe(
                (sections: Section[]) => {
                    this.sections = sections;
                }
            );
    }

    onSubmit(addSectionForm: NgForm) {

        if (this.mysection) {
            // Edit
            const oldSectionName = addSectionForm.value.oldSectionName;
            this.mysection.position = addSectionForm.value.position;
            this.mysection.sectionName = addSectionForm.value.sectionName;
            this.sectionService.update(this.mysection, oldSectionName)
                .subscribe(
                    result => console.log(result)
                );
            this.mysection = null;
        } else {
            // Create
            const mysection = new Section(
                addSectionForm.value.position,
                addSectionForm.value.sectionName,
                'trainings'
            );
            this.sectionService.create(mysection)
                .subscribe(
                    data => {
                        this.sections.push(mysection);
                    },                    
                    error => console.error(error)
                );
        }
        addSectionForm.resetForm();
    }

    sectionDelete(section: Section){
        this.sectionService.deleteSection(section)
        .subscribe(
            result => {
                this.sections.splice(this.sections.indexOf(section), 1);
            });
    }

    sectionEdit(section: Section) {
        this.sectionService.editSection(section)
    }



}