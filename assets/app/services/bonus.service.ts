import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Bonus } from "../models/bonus.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';

@Injectable()
export class BonusService {
    private bonuses: Bonus[] = [];

    constructor(private http: Http, private errorService: ErrorService) { }



    create(bonus: Bonus) {
        const body = JSON.stringify(bonus);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl+'/bonus', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const bonus = new Bonus(
                    new Date(result.obj.date),
                    result.obj.content
                );
                this.bonuses.push(bonus);
                return bonus;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getAllBonus() {
        return this.http.get(environment.siteUrl+'/bonus/')
            .map((response: Response) => {
                const bonuses = response.json().obj;
                let bonusList: Bonus[] = [];
                for (let bonus of bonuses) {
                    bonusList.push(new Bonus(
                        new Date(bonus.date),
                        bonus.content,
                        bonus._id
                    )
                    );
                }
                return bonusList;
            })
            .catch(error => {
                return Observable.throw('Erreur dans getAllBonus');
            });
    }

    deleteBonus(bonus: Bonus) {
        return this.http.delete(environment.siteUrl+'/bonus/' + bonus.bonusID)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}