import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";
import { Panier } from "../models/panier.model";
import { PanierService } from "../services/panier.service";
import { Product } from "../models/product.model";

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {
    myForm: FormGroup;
    myuser: User;
    mycart: Panier;
    total: number = 0;

    constructor(private userService: UserService, private panierService: PanierService, public router: Router) {
    }

    onSubmit() {
    }



    ngOnInit() {

        this.mycart = this.panierService.mypanier;
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
    }

    onDeleteFromCart(product: Product) {
        this.panierService.removeProductsFromBasket(this.myuser, product).subscribe(
            data => {
                this.myuser.panier.splice(this.myuser.panier.indexOf(product), 1);
                this.mycart.products.splice(this.mycart.products.indexOf(product), 1);
                this.panierService.mypanier.numberOfItems -= 1;
                this.panierService.mypanier.total = Math.round((Math.round(this.panierService.mypanier.total * 100) / 100 - Math.round(product.price * 100) / 100) * 100) / 100;
                if (this.panierService.mypanier.total == 0) {
                    this.router.navigate(['/']);
                }
            },
            error => console.log('error')
        )
    }
}