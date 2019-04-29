import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../models/user.model";
import { Mdp } from "../models/mdp.model";
import { Message } from "../models/message.model";
import { Notification } from "../models/notification.model";
import { Product } from "../models/product.model";

import { ErrorService } from "../errors/error.service";
import { ProductService } from "../services/product.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class UserService {
    myuser: User;

    constructor(private http: Http, private errorService: ErrorService, private productService: ProductService) { }


    updateLastConnection(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/updateConnection', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateLastClickOnNews(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/updateLastClickOnNews', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    update(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/user/update', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updatewithpassword(user: User, token: string) {
        
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/user/updatewithpassword/' + token, body, { headers: headers })
            .map((response: Response) => {
                response.json()
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updatemdp(mdp: Mdp) {
        const body = JSON.stringify(mdp);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/user/updatemdp', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/user/signin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    addProductsToUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addProducts', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    addProductToUser(user: User, product: Product) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addProduct/' + product.productID, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    addTrainingToUser(user: User, training: Product) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addTraining/' + training.productID, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    addTrainingsToUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addTrainings', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getUserInfoById(userId: String) {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(environment.siteUrl + '/user/' + userId + token)
            .map((response: Response) => {
                const resUser = response.json().obj;
                const birthDate = new Date(resUser[0].birthDate) //.toLocaleString("en-GB", {year: "numeric", month: "numeric", day: "numeric"});

                let userTrainings: Product[] = [];
                resUser[0].userTrainings.map(training => {
                    let userTraining = new Product(
                        training.name,
                        'training',
                        training.picture,
                        training.description_preview,
                        training.description_detail,
                        training.benefits_detail,
                        training.position,
                        null,
                        null,
                        training.price,
                        training.value,
                        training.activated,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        training._id,
                        training.fa_title,
                        training.link_to
                    );
                    userTrainings.push(userTraining)
                })

                let userProducts: Product[] = [];
                resUser[0].userProducts.map(product => {
                    let userProduct = new Product(
                        product.name,
                        'produit',
                        product.picture,
                        product.description_preview,
                        product.description_detail,
                        product.benefits_detail,
                        product.position,
                        null,
                        null,
                        product.price,
                        product.value,
                        product.activated,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        product._id,
                        product.fa_title,
                        product.link_to,
                        [],
                        product.formationProduit,
                        product.downloadableBonus
                    );
                    userProducts.push(userProduct)
                })

                let userBaskets: Product[] = [];
                resUser[0].panier.map(product => {
                    let userBasket = new Product(
                        product.name,
                        product.whatFor,
                        product.picture,
                        product.description_preview,
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
                        product.fa_title
                    );
                    userBaskets.push(userBasket)
                })

                const user = new User(resUser[0].email.trim().toLowerCase(), '', resUser[0].firstName, resUser[0].lastName, resUser[0].phone, birthDate, userTrainings, userProducts, [], new Date(resUser[0].lastConnection), new Date(resUser[0].lastClickOnNews), resUser[0].proxy, userBaskets);

                let notifForUser = []
                resUser[0].userNotifications.map(notif => {
                    let notiff = new Notification(new Date(notif.date), notif.content, notif.link, notif._id, notif.favicon)
                    notifForUser.push(notiff);
                });
                user.userNotifications = notifForUser;

                this.myuser = user;
                return user;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getAllUsers() {
        return this.http.get(environment.siteUrl + '/user/all')
            .map((response: Response) => {
                const users = response.json().obj;

                let userList: User[] = [];
                for (let user of users) {
                    let userTrainings: Product[] = [];
                    user.userTrainings.map(training => {

                        let userTraining = this.productService.productBuilder(training);
                        userTrainings.push(userTraining);
                    })

                    let userProducts: Product[] = [];
                    user.userProducts.map(product => {
                        let userProduct = this.productService.productBuilder(product);
                        userProducts.push(userProduct)
                    })


                    const birthDate = new Date(user.birthDate) //.toLocaleString("en-GB", {year: "numeric", month: "numeric", day: "numeric"});

                    userList.push(new User(
                        user.email.trim().toLowerCase(),
                        '',
                        user.firstName,
                        user.lastName,
                        user.phone,
                        birthDate,
                        userTrainings,
                        userProducts,
                        null,
                        null,
                        null,
                        user.proxy
                    ));
                }
                return userList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteUser(email: String) {
        return this.http.delete(environment.siteUrl + '/user/' + email.trim().toLowerCase())
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    isAdmin(user: User) {
        if (user.proxy == '3000') return true
        else return false;
    }


    addAdmin(user: User) {
        const body = JSON.stringify(user);

        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl + '/user/addadmin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    forgotPassword(email: String) {
        return this.http.get(environment.siteUrl + '/user/forgotpassword/' + email.trim().toLowerCase())
            .map((response: Response) => {
                response.json()
                //Reponse si l'email existe bien ou pas
                const message = response.json().message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    resetPassword(user: User, token: string) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.siteUrl + '/user/resetmdp/' + token, body, { headers: headers })
            .map((response: Response) => {
                response.json()
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}