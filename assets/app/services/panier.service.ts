import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../models/user.model";
import { Notification } from "../models/notification.model";
import { Product } from "../models/product.model";

import { ErrorService } from "../errors/error.service";
import { ProductService } from "../services/product.service";
import { UserService } from "../services/user.service";
import { environment } from '../../../environments/environments';
import { Panier } from "../models/panier.model";


@Injectable()
export class PanierService {
    mypanier: Panier;

    constructor(private http: Http, private errorService: ErrorService, private productService: ProductService, private userService: UserService) {
        const userId = localStorage.getItem('userId');

        this.mypanier = new Panier(0, []);
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                var total = 0;
                user.panier.map(productMap => {
                    this.mypanier.products.push(productMap);
                    this.mypanier.numberOfItems += 1;
                    total += productMap.price;
                })
                this.mypanier.total = total;
            });
    }


    addProductsInBasket(user: User, product: Product) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addProductsInBasket/' + product.productID, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    removeProductsFromBasket(user: User, product: Product) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/removeProductsFromBasket/' + product.productID, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    sendToken(userId: String, token: any) {
        const body = JSON.stringify(token);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/checkout/pay/' + userId, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    emptyBasket(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/emptyBasket/', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}