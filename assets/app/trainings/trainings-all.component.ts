import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { SectionCounter } from "../models/sectioncounter.model";
import { UserService } from "../services/user.service";


@Component({
    selector: 'app-trainings-all',
    templateUrl: './trainings-all.component.html'
})
export class TrainingsAllComponent implements OnInit {

    products: Product[] = [];        //Ce produit est une formation
    allproducts: Product[] = [];
    sectionCount: SectionCounter[] = []; //Sert à compter l'occurence de chaque section
    loader = true;
    userTrainings: Product[] = [];


    quotes = [
        { quote: "Le vrai pouvoir, c'est la connaissance", author: "Francis Bacon" },
        { quote: "La connaissance est dans l'action", author: "Louis Gauthier" },
        { quote: "La connaissance est toujours un butin", author: "Maxime Gorki" },
        { quote: "Aie la connaissance ou écoute ceux qui l’ont", author: "Baltasar Gracian y Morales" },
        { quote: "La connaissance est le début de l'action : l'action, l'accomplissement de la connaissance", author: "Wang Young Ming" },
        { quote: "Apprendre sans réfléchir est vain. Réfléchir sans apprendre est dangereux", author: "Confucius" }
    ]
    quoteNb = Math.floor(Math.random() * (this.quotes.length));


    constructor(private sectionService: SectionService, private productService: ProductService, private userService: UserService) { }

    ngOnInit() {

        this.productService.getProducts('trainings')
            .subscribe(
            (products: Product[]) => {
                products.map(productMap => {                      //On regarde tous les products
                    if (productMap.activated) {                   //Si il est affiché
                        this.allproducts.push(productMap);
                        productMap.sections.map(sectionMap => {     //On Map pour ajouter dans la liste des section
                            var dejaPresent = false;
                            this.sectionCount.map(SectionCounterMap => {
                                if (SectionCounterMap.section.sectionName == sectionMap.sectionName) {
                                    dejaPresent = true;
                                    SectionCounterMap.nb = SectionCounterMap.nb + 1;
                                }
                            })

                            if (!dejaPresent) {
                                this.sectionCount.push(new SectionCounter(sectionMap, 1))
                            }

                        })
                    }
                    this.loader = false;
                })
                if (this.allproducts.length == 0) this.loader = false;
                this.products = this.allproducts;
            })

        //Recuperation des produits de l'user

        this.userTrainings = this.userService.myuser.userTrainings;

        /*const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.userTrainings = user.userTrainings;
            });
            */
    };

    sectionFilter(section: any) {
        if (section == 'all') {
            this.products = this.allproducts;

        }
        else {
            var productsFiltered = [];
            this.products = this.allproducts;
            this.products.map(productMap => {
                if ((productMap.sections.filter(sectionMap => sectionMap.sectionID == section.sectionID)).length > 0) {
                    productsFiltered.push(productMap);
                }
            });
            this.products = productsFiltered;
            //this.products = [];
        }
    }

    isInProducts(produit: Product) {
        let inside = false;
        this.userTrainings.map(product => {
            if (produit.productID == product.productID) inside = true;
        });
        return inside;
    }
}