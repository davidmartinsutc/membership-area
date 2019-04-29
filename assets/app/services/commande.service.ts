import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Commande } from "../models/commande.model";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class CommandeService {
    private commandes: Commande[] = [];

    constructor(private http: Http, private errorService: ErrorService) { }



    getAllCommandes() {
        return this.http.get(environment.siteUrl + '/commande/')
            .map((response: Response) => {
                const commandes = response.json().obj;
                let commandeList: Commande[] = [];
                for (let commande of commandes) {
                    var user = new User(commande.user.email, '', commande.user.firstName, commande.user.lastName);
                    var productsList = [];

                    commande.products.map(product => {
                        let myProduct = new Product(
                            product.name,
                            product.whatFor,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            product.price,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            product._id,
                            null,
                            product.link_to);
                        productsList.push(myProduct);
                    });

                    commandeList.push(new Commande(
                        user,
                        productsList,
                        commande.date,
                        commande.traite,
                        commande._id)
                    );
                }
                return commandeList;
            })
            .catch(error => {
                return Observable.throw('Erreur dans getAllNotifications');
            });
    }


    setValidated(commande: Commande) {
        const body = JSON.stringify(commande);
        const headers = new Headers({'Content-Type': 'application/json'});
  
        return this.http.patch(environment.siteUrl+'/commande/setvalidated', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}