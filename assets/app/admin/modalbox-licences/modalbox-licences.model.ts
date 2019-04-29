import { Product } from "../../models/product.model";
import { User } from "../../models/user.model";


export class ModalBoxLicences {
    constructor(public product: Product, public licenceFile?: File) {}
}