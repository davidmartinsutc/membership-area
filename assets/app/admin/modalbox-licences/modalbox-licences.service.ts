import { EventEmitter } from "@angular/core";

import { ModalBoxLicences } from "./modalbox-licences.model";
import { Product } from "../../models/product.model";

import { FormGroup, FormControl, Validators } from "@angular/forms";

export class ModalBoxLicencesService {
    openBox = new EventEmitter<ModalBoxLicences>();

    manageLicences(product: Product) {
        const boxData = new ModalBoxLicences(product);
        this.openBox.emit(boxData);
    }
}