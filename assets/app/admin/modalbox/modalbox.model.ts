import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";


export class ModalBox {
    constructor(public title: string, public user: User, public products: Product[], public selectedProducts: Product[], public whatFor: string) {}
}