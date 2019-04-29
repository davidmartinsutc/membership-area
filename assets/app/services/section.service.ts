import { Injectable, EventEmitter} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Section } from "../models/section.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';

@Injectable()
export class SectionService {
    sectionIsEdit = new EventEmitter<Section>();

    constructor(private http: Http, private errorService: ErrorService) {}

    create(section: Section) {
        const body = JSON.stringify(section);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(environment.siteUrl+'/section/create', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    update(section: Section, oldSectionName: String) {
        const body = JSON.stringify(section);
        const headers = new Headers({'Content-Type': 'application/json'});
 
        return this.http.patch(environment.siteUrl+'/section/' + oldSectionName, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




    getAllSectionsByPositionAndWhatFor(whatFor: String) {
        return this.http.get(environment.siteUrl+'/section/allbypositionandwhatfor/' + whatFor)
            .map((response: Response) => {
                const sections = response.json().obj;
                let sectionList: Section[] = [];
                for (let section of sections) {
                    sectionList.push(new Section(
                        section.position,
                        section.sectionName,
                        section.whatFor,
                        section._id,
                        section.products.length)
                    );
                }
                return sectionList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteSection(section: Section) {
        return this.http.delete(environment.siteUrl+'/section/' + section.sectionName)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editSection(section: Section) {
        this.sectionIsEdit.emit(section);
    }


}