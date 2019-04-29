import { EventEmitter } from "@angular/core";

import { ModalBox } from "./modalbox.model";
import { User } from "../../models/user.model";
import { Product } from "../../models/product.model";

import { UserService } from "../../services/user.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";

export class ModalBoxService {
    openBox = new EventEmitter<ModalBox>();

    addProducts(user: User, products: Product[], whatFor: string) {
        var selectedProducts: Product[]= [];

        if (whatFor == 'produit') {
            user.userProducts.map( produit => {
                selectedProducts.push(produit);
            })
        }
        else if (whatFor == 'training') {
            user.userTrainings.map( produit => {
                selectedProducts.push(produit);
            })
        }

        const boxData = new ModalBox('Ajouter', user, products, selectedProducts, whatFor);
        this.openBox.emit(boxData);
    }
}