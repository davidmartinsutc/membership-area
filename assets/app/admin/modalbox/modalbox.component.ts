import { Component, OnInit } from "@angular/core";

import { ModalBox } from "./modalbox.model";
import { ModalBoxService } from "./modalbox.service";
import { Product } from "../../models/product.model";
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-modalbox',
    templateUrl: './modalbox.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ModalBoxComponent implements OnInit {
    modalBox: ModalBox;
    display = 'none';


    constructor(private modalBoxService: ModalBoxService, private userService: UserService) { }

    onHideAddProducts() {
        this.modalBox = null;
        this.display = 'none';
    }

    onAddProducts() {
        this.modalBox.user.userProducts = [];
        this.modalBox.user.userTrainings = [];

        if (this.modalBox.whatFor == 'produit') {
            this.modalBox.user.userProducts = this.modalBox.selectedProducts;
            this.userService.addProductsToUser(this.modalBox.user).subscribe();
        }
        else if (this.modalBox.whatFor == 'training') {
            this.modalBox.user.userTrainings = this.modalBox.selectedProducts;
            this.userService.addTrainingsToUser(this.modalBox.user).subscribe();
        }
        this.onHideAddProducts();
    }

    ngOnInit() {
        this.modalBoxService.openBox
            .subscribe(
            (modalBox: ModalBox) => {
                this.modalBox = modalBox;
                this.display = 'block';
            }
            );
    }


    addSelectedProduct(product: Product) {
        if (this.modalBox.selectedProducts.indexOf(product) < 0) {
            this.modalBox.selectedProducts.push(product);
        }
        else {
            this.modalBox.selectedProducts.splice(this.modalBox.selectedProducts.indexOf(product), 1);
        }
    }

    userHave(product: Product) {
        //On check si le produit demande est deja dans les produits de l'utilisateur
        let isInUserProducts = false;

        if (this.modalBox.whatFor == 'produit') {
            this.modalBox.user.userProducts.map(productMap => {
                if (productMap.productID == product.productID) {
                    isInUserProducts = true;
                }
            })
        }
        else if (this.modalBox.whatFor == 'training') {
            this.modalBox.user.userTrainings.map(trainingMap => {
                if (trainingMap.productID == product.productID) {
                    isInUserProducts = true;
                }
            })
        }
        return isInUserProducts;
    }
}