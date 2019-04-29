import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Badge } from "../models/badge.model";

import { ProductService } from "../services/product.service";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";


@Component({
    selector: 'app-products-all',
    templateUrl: './member-dashboard.component.html'
})
export class MemberDashboardComponent implements OnInit {
    products: Product[];        //Ce produit est une formation
    trainings: Product[];       //Ce produit est une formation
    badges: Badge[];           //Badges de l'utilisateur
    myuser: User;

    constructor(private productService: ProductService, private userService: UserService) { }

    ngOnInit() {

        if (this.userService.myuser) {
            this.myuser = this.userService.myuser;
        }
        else {
            const userId = localStorage.getItem('userId');
            this.userService.getUserInfoById(userId)
                .subscribe((user) => {
                    this.myuser = user;
                });
        }

        this.products = this.myuser.userProducts;
        this.trainings = this.myuser.userTrainings;
        this.generateBadges();

        const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.myuser = user;
                var arrayt = this.myuser.userTrainings;
                var flagst = [], outputt = [], l = arrayt.length, i;
                for (i = 0; i < l; i++) {
                    if (flagst[arrayt[i].productID]) continue;
                    flagst[arrayt[i].productID] = true;
                    outputt.push(arrayt[i]);
                }
                this.trainings = outputt;

                var arrayp = this.myuser.userProducts;
                var flagsp = [], outputp = [], l = arrayp.length, i;
                for (i = 0; i < l; i++) {
                    if (flagsp[arrayp[i].productID]) continue;
                    flagsp[arrayp[i].productID] = true;
                    outputp.push(arrayp[i]);
                }
                this.products = outputp;

                this.generateBadges();
            });
    };

    generateBadges() {
        //Premier badge pour avoir accèdé à l'espace membre
        this.badges = [];
        this.badges.push(new Badge('icon-block half img-circle bg-orange-300', 'fa fa-star text-white', 'Nouveau Membre'));

        if (this.myuser.userProducts.length > 0)    //Au moins un produit
        {
            this.badges.push(new Badge('icon-block half img-circle bg-indigo-300', 'fa fa-trophy text-white', 'Premier Produit'));
        }
        if (this.myuser.userTrainings.length > 0) //Au moins une formation
        {
            this.badges.push(new Badge('icon-block half img-circle bg-green-300', 'fa fa-mortar-board text-white', 'Première Formation'));
        }
    }



}