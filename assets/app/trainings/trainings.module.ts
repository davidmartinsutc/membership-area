import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainingsAllComponent } from "./trainings-all.component";
import { TrainingsDetailComponent } from "./trainings-detail.component";
import { TrainingsTakeCourseComponent } from "./trainings-take-course.component";

import { ApplicationPipes } from "../pipe/pipe.module"

import { trainingsRouting } from "./trainings.routing";

@NgModule({
    declarations: [
        TrainingsAllComponent,
        TrainingsDetailComponent,
        TrainingsTakeCourseComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        trainingsRouting,
        ApplicationPipes
    ]
})
export class TrainingsModule {

}