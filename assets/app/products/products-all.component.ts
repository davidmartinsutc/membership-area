import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { UserService } from "../services/user.service";
import { SectionCounter } from "../models/sectioncounter.model";


@Component({
    selector: 'app-products-all',
    templateUrl: './products-all.component.html'
})
export class ProductsAllComponent implements OnInit {

    products: Product[] = [];        //Ce produit est une formation
    allproducts: Product[] = [];
    sectionCount: SectionCounter[] = []; //Sert à compter l'occurence de chaque section
    loader = true;
    userProducts: Product[] = [];

    quotes = [
        { quote: "Depuis la naissance de l'homme, les outils ont toujours été le prolongement de son cerveau.", author: "Nabil Alami" },
        { quote: "Un mauvais ouvrier a toujours de mauvais outils", author: "Proverbe Québécois" },
        { quote: "Si le seul outil que vous avez est un marteau vous verrez tout problème comme un clou", author: "Abraham Maslow" },
        { quote: "Selon 32% des hommes, leur équipement électroménager se limite à leur épouse", author: "Marc Escayrol" },
        { quote: "Plongeur sous-marin débutant, cherche équipement réduit pour expérimentation en lavabo.", author: "Pierre Dac" },
        { quote: "Il n’y a pas de mauvais temps, juste de mauvais équipements", author: "Proverbe" },
        { quote: "L'homme est un animal qui utilise des outils. Sans outils il n'est rien, avec des outils il est tout", author: "Thomas Carlyle" },
        { quote: "La connaissance est le début de l'action : l'action, l'accomplissement de la connaissance", author: "Wang Young Ming" },
    ]
    quoteNb = Math.floor(Math.random() * (this.quotes.length));


    constructor(private sectionService: SectionService, private productService: ProductService, private userService: UserService) { }

    ngOnInit() {

        this.productService.getProducts('produits')
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
                this.products=this.allproducts;
            })

        //Recuperation des produits de l'user
        this.userProducts = this.userService.myuser.userProducts;

        /*const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.userProducts = user.userProducts;
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
        this.userProducts.map(product => {
            if (produit.productID == product.productID) inside = true;
        });
        return inside;
    }
}