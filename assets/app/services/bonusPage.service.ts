import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { BonusPage } from "../models/bonusPage/bonusPage.model";
import { Bonus } from "../models/bonusPage/bonus.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';

@Injectable()
export class BonusPageService {

    constructor(private http: Http, private errorService: ErrorService) { }

    create(bonusPage: BonusPage) {
        const body = JSON.stringify(bonusPage);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/bonuspage', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateBonusPage(bonusPage: BonusPage) {
        const body = JSON.stringify(bonusPage);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(environment.siteUrl + '/bonuspage/update', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getBonusPageById(bonusPageID: string) {
        return this.http.get(environment.siteUrl + '/bonuspage/getbyid/' + bonusPageID)
            .map((response: Response) => {
                const resBonusPage = response.json().obj;
                if (!resBonusPage.description) resBonusPage.description = "";
                const bonusPage = new BonusPage(resBonusPage.titre, resBonusPage.description, resBonusPage._id, []);

                resBonusPage.bonus.map(bonusMap => {
                    bonusPage.bonus.push(new Bonus(bonusMap.titre, bonusMap.image, bonusMap.description, bonusMap.downloadLink))
                });

                return bonusPage;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    getAllBonusPages() {
        return this.http.get(environment.siteUrl + '/bonuspage/all')
            .map((response: Response) => {
                const bonusPages = response.json().obj;
                let bonusPagesList: BonusPage[] = [];
                for (let bonusPage of bonusPages) {
                    bonusPagesList.push(new BonusPage(
                        bonusPage.titre,
                        bonusPage.description,
                        bonusPage._id)
                    );
                }
                return bonusPagesList;
            })
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }

    deleteBonusPage(bonusPage: BonusPage) {
        return this.http.delete(environment.siteUrl + '/bonuspage/' + bonusPage.bonusPageID)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




}