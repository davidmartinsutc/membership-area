import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { PanierService } from "../services/panier.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-trainings-detail',
    templateUrl: './trainings-detail.component.html'
})
export class TrainingsDetailComponent implements OnInit {
    product: Product;
    userTrainings: Product[] = [];
    myuser: User;
    displayPopUp = 'none';

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private userService: UserService, private panierService: PanierService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {
        //Recuperation des produits de l'user
        if (this.userService.myuser){
        this.userTrainings = this.userService.myuser.userTrainings;
        this.myuser = this.userService.myuser;
        }
        else {
        const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.userTrainings = user.userTrainings;
                this.myuser = user;
            });
        }
    }

    initialisation() {
        const productName = this.route.snapshot.paramMap.get('detail');

        this.productService.getProductByName(productName)
            .subscribe(
            (productMap: Product) => {
                this.product = productMap;
            });

    };

    goToFormations() {
        if (!this.isInProducts(this.product)) {
            this.userService.addTrainingToUser(this.myuser, this.product)
                .subscribe()    //A ajouter ici dans les produits de l'user pour le display
        }
        this.router.navigate(['/trainings/cours/' + this.product.link_to]);
    }

    isInProducts(formation: Product) {
        let inside = false;
        this.userTrainings.map(training => {
            if (formation.productID == training.productID) inside = true;
        });
        return inside;
    }


    onHideAdded() {
        this.displayPopUp = 'none';
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

    isInTrainings(formation: Product) {
        let inside = false;
        this.userTrainings.map(training => {
            if (formation.productID == training.productID) inside = true;
        });
        return inside;
    }

}