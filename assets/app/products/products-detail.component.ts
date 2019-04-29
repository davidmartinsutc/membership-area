import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "../services/user.service";
import { PanierService } from "../services/panier.service";
import { User } from "../models/user.model";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-products-detail',
    templateUrl: './products-detail.component.html'
})
export class ProductsDetailComponent implements OnInit, OnDestroy {
    product: Product;
    userProducts: Product[] = [];
    myuser: User;
    displayPopUp = 'none';
    displayPopUpMyProducts = 'none';

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private userService: UserService, private panierService: PanierService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {
        //Recuperation des produits de l'user

         var content = <HTMLInputElement>document.getElementById("content");
         content.style.setProperty('margin-left', '0');
         var container = <HTMLInputElement>document.getElementById("container-fluidvar");
         container.style.setProperty('padding-left', '0');
         container.style.setProperty('padding-right', '0');
         container.style.setProperty('height', '100%');
 





        if (this.userService.myuser) {
            this.userProducts = this.userService.myuser.userProducts;
            this.myuser = this.userService.myuser;
        }
        else {
            const userId = localStorage.getItem('userId');
            this.userService.getUserInfoById(userId)
                .subscribe((user) => {
                    this.userProducts = user.userProducts;
                    this.myuser = user;
                });
        }
    }


    ngOnDestroy() {
        console.log('bye');
        var content = <HTMLInputElement>document.getElementById("content");
        content.style.setProperty('margin-left', '56px');
        var container = <HTMLInputElement>document.getElementById("container-fluidvar");
        container.style.setProperty('padding-left', '20px');
        container.style.setProperty('padding-right', '20px');
    }

    initialisation() {
        const productName = this.route.snapshot.paramMap.get('detail');

        this.productService.getProductByName(productName)
            .subscribe(
            (productMap: Product) => {
                this.product = productMap;
            });
    };

    isInProducts(produit: Product) {
        let inside = false;
        this.userProducts.map(product => {
            if (produit.productID == product.productID) inside = true;
        });
        return inside;
    }

    addInBacket() {
        this.displayPopUp = 'block';
        this.panierService.addProductsInBasket(this.myuser, this.product)
            .subscribe(okay => {
                this.myuser.panier.push(this.product);
                this.panierService.mypanier.numberOfItems += 1;
                this.panierService.mypanier.products.push(this.product);
                this.panierService.mypanier.total += Number(this.product.price);
            },
            error => console.log('error'));
    }

    isInBasket(user, product) {
        let inside = false;
        user.panier.map(productPanier => {
            if (product.productID == productPanier.productID) {
                inside = true;
            }
        });
        return inside;
    }

    onHideAdded() {
        this.displayPopUp = 'none';
    }

    addInMyProducts() {
        this.displayPopUpMyProducts = 'block';
        this.userService.addProductToUser(this.myuser, this.product)
            .subscribe();    //A ajouter ici dans les produits de l'user pour le display
        var membersoftware = (<HTMLInputElement>document.getElementById('membersoftware'));
        membersoftware.style.display = 'none';
    }

    onHideAddedMyProducts() {
        this.displayPopUpMyProducts = 'none';
    }

}