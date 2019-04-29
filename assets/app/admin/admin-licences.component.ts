import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product.model";
import { ModalBoxLicencesService } from "./modalbox-licences/modalbox-licences.service";


@Component({
    selector: 'app-admin-licences',
    templateUrl: './admin-licences.component.html'
})

export class AdminLicencesComponent implements OnInit {
    products: Product[];

    constructor(private productService: ProductService, private modalBoxLicencesService: ModalBoxLicencesService) { }

    ngOnInit() {
        this.productService.getProducts('produits')
            .subscribe(
            (products: Product[]) => {
                this.products = products;
            }
            );
    }

    uploadLicence(produit: Product) {
        this.modalBoxLicencesService.manageLicences(produit)
    }


}