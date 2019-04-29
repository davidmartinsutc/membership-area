import { Product } from "../models/product.model";

export class Panier {
    constructor(
        public numberOfItems: number,
        public products?: Product[],
        public total?: number) { }
}