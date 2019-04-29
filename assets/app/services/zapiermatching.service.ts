import { Injectable, EventEmitter} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Zapiermatching } from "../models/zapiermatching.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';

@Injectable()
export class ZapiermatchingService {
    zapiermatchingIsEdit = new EventEmitter<Zapiermatching>();

    constructor(private http: Http, private errorService: ErrorService) {}

    create(zapiermatching: Zapiermatching) {
        const body = JSON.stringify(zapiermatching);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(environment.siteUrl+'/zapiermatching/create', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    update(zapiermatching: Zapiermatching, oldZapiermatchingName: String) {
        const body = JSON.stringify(zapiermatching);
        const headers = new Headers({'Content-Type': 'application/json'});
 
        return this.http.patch(environment.siteUrl+'/zapiermatching/' + oldZapiermatchingName, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




    getAllZapiermatchings() {
        return this.http.get(environment.siteUrl+'/zapiermatching/all/')
            .map((response: Response) => {
                const zapiermatchings = response.json().obj;
                let zapiermatchingList: Zapiermatching[] = [];
                for (let zapiermatching of zapiermatchings) {
                    zapiermatchingList.push(new Zapiermatching(
                        zapiermatching.zapier_name,
                        zapiermatching.product_id)
                    );
                }
                return zapiermatchingList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteZapiermatching(zapiermatching: Zapiermatching) {
        return this.http.delete(environment.siteUrl+'/zapiermatching/' + zapiermatching.zapier_name)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editZapiermatching(zapiermatching: Zapiermatching) {
        this.zapiermatchingIsEdit.emit(zapiermatching);
    }

}