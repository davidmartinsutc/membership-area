import { Routes, RouterModule } from "@angular/router";

import { TrainingsAllComponent } from "./trainings-all.component";
import { TrainingsDetailComponent } from "./trainings-detail.component";
import { TrainingsTakeCourseComponent } from "./trainings-take-course.component";

const TRAININGS_ROUTES: Routes = [
    { path: '', component: TrainingsAllComponent, pathMatch: 'full' },
    { path: ':detail', component: TrainingsDetailComponent },
    { path: 'cours/:coursID', component: TrainingsTakeCourseComponent },
    { path: '**', component: TrainingsAllComponent }
];

export const trainingsRouting = RouterModule.forChild(TRAININGS_ROUTES);