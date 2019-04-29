import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Cours } from "../models/cours/cours.model";
import { Chapitre } from "../models/cours/chapitre.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';
import { SousChapitre } from "../models/cours/sous-chapitre.model";

@Injectable()
export class CoursService {

    constructor(private http: Http, private errorService: ErrorService) { }

    create(cours: Cours) {
        const body = JSON.stringify(cours);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/cours', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateCours(cours: Cours) {
        const body = JSON.stringify(cours);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(environment.siteUrl + '/cours/updatecours', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getCoursById(coursID: string) {
        return this.http.get(environment.siteUrl + '/cours/getbyid/' + coursID)
            .map((response: Response) => {
                const resCours = response.json().obj;
                if (!resCours.description) resCours.description = "";
                const cours = new Cours(resCours.titre, resCours.lien, resCours.description, resCours._id, []);

                resCours.chapitres.map(chapitreMap => {
                    let sousChapitresArray = [];
                    chapitreMap.sousChapitres.map(sousChapitresMap => {
                        if (!sousChapitresMap.texte) sousChapitresMap.texte = "";
                        sousChapitresArray.push(new SousChapitre(sousChapitresMap.titre, sousChapitresMap.texte, sousChapitresMap.video, sousChapitresMap.numero, sousChapitresMap.duree));
                    })
                    sousChapitresArray = sousChapitresArray.sort(function (obj1, obj2) { return obj1.numero - obj2.numero; });
                    if (!chapitreMap.description) chapitreMap.description = "";
                    cours.chapitres.push(new Chapitre(chapitreMap.titre, sousChapitresArray, chapitreMap.numero, chapitreMap.description))
                });

                cours.chapitres = cours.chapitres.sort(function (obj1, obj2) { return obj1.numero - obj2.numero; });
                return cours;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    getAllCours() {
        return this.http.get(environment.siteUrl + '/cours/all')
            .map((response: Response) => {
                const courses = response.json().obj;
                let coursList: Cours[] = [];
                for (let cours of courses) {
                    coursList.push(new Cours(
                        cours.titre,
                        cours.lien,
                        cours.description,
                        cours._id)
                    );
                }
                return coursList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteCours(cours: Cours) {
        return this.http.delete(environment.siteUrl + '/cours/' + cours.coursID)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editCours(cours: Cours) {
        //
    }


}