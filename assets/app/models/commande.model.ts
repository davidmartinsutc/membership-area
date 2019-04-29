import { User } from "../models/user.model";
import { Product } from "../models/product.model";

export class Commande {
    constructor(
        public user: User,
        public products?: Product[],
        public date?: Date,
        public traite?: boolean,
        public commandeId?: string) { }
}