import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "../models/message.model";
import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class EmailSenderService {

    constructor(private http: Http, private errorService: ErrorService) {
    }

    sendEmail(message: any) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/emailsender', body, { headers: headers })
            .map((response: Response) => {
                const result = response;
                return result;
            })
            .catch((error: Response) => {
                //this.errorService.handleError(error.json());
                return Observable.throw(error);
            });
    }
}