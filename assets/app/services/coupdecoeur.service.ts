import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Coupdecoeur } from "../models/coupdecoeur.model";
import { Section } from "../models/section.model";
import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class CoupdecoeurService {
    private coupdecoeurs: Coupdecoeur[] = [];
    coupdecoeurIsEdit = new EventEmitter<Coupdecoeur>();

    constructor(private http: Http, private errorService: ErrorService) {
    }


    addPicture(coupdecoeur: Coupdecoeur, coupdecoeurID: string) {
        const formData: any = new FormData();
        const image = coupdecoeur.image;
        const imageName = image.name.replace(/\s/g, "");

        formData.append('uploadFile', image, imageName);
        formData.append('coupdecoeurID', coupdecoeurID);


        return this.http.post(environment.siteUrl+'/coupdecoeur/picture', formData)
            .map(files => files.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    addCoupdecoeur(coupdecoeur: Coupdecoeur) {
        const body = JSON.stringify(coupdecoeur);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl+'/coupdecoeur', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const coupdecoeur = new Coupdecoeur(
                    result.obj.name,
                    result.obj.picture,
                    result.obj.description,
                    null,
                    null,
                    result.obj.video,
                    result.obj.second_title,
                    result.obj.coupdecoeurID,
                    result.obj.link_to_aff,
                    result.obj.link_to_noaff,
                );
                this.coupdecoeurs.push(coupdecoeur);
                return result.obj._id;  //On retourne l'id du coupdecoeur
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




    getCoupdecoeurs() {        
        return this.http.get(environment.siteUrl+'/coupdecoeur/')
            .map((response: Response) => {
                const coupdecoeurs = response.json().obj;
                let transformedCoupdecoeurs: Coupdecoeur[] = [];

                for (let coupdecoeur of coupdecoeurs) {

                    let sectionCoupdecoeur: Section[] = [];
                    for (let section of coupdecoeur.sections) {
                        sectionCoupdecoeur.push(
                            new Section(section.position, section.sectionName, section.whatFor, section._id)
                        )
                    }

                    transformedCoupdecoeurs.push(new Coupdecoeur(
                        coupdecoeur.name,
                        coupdecoeur.picture,
                        coupdecoeur.description,
                        sectionCoupdecoeur,
                        null,
                        coupdecoeur.video,
                        coupdecoeur.second_title,
                        coupdecoeur._id,
                        coupdecoeur.link_to_aff,
                        coupdecoeur.link_to_noaff
                    ));
                }

                this.coupdecoeurs = transformedCoupdecoeurs;
                console.log(this.coupdecoeurs)
                return transformedCoupdecoeurs;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    


    getCoupdecoeurByName(coupdecoeurName: string) {
        return this.http.get(environment.siteUrl+'/coupdecoeur/name/' + coupdecoeurName)
            .map((response: Response) => {
                const resCoupdecoeur = response.json().obj;
                const coupdecoeur = new Coupdecoeur(resCoupdecoeur.name, resCoupdecoeur.picture, resCoupdecoeur.description, resCoupdecoeur.sections, null, resCoupdecoeur.video, resCoupdecoeur.second_title, resCoupdecoeur.coupdecoeurID, resCoupdecoeur.link_to_aff, resCoupdecoeur.link_to_aff);
                return coupdecoeur;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editCoupdecoeur(coupdecoeur: Coupdecoeur) {
        this.coupdecoeurIsEdit.emit(coupdecoeur);
    }

    update(coupdecoeur: Coupdecoeur, oldCoupdecoeurName: String) {

        const body = JSON.stringify(coupdecoeur);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(environment.siteUrl+'/coupdecoeur/' + oldCoupdecoeurName, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return result.obj._id;  //On retourne l'id du produit
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteCoupdecoeur(coupdecoeur: Coupdecoeur) {
        return this.http.delete(environment.siteUrl+'/coupdecoeur/' + coupdecoeur.name)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


}