import { Product } from "../models/product.model";
import { Notification } from "../models/notification.model";

export class User {
    constructor(public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public phone?: string,
                public birthDate?: Date,
                public userTrainings?: Product[],
                public userProducts?: Product[],
                public userNotifications?: Notification[],
                public lastConnection?: Date,
                public lastClickOnNews?: Date,
                public proxy?: string,
                public panier?: Product[]
            ) {}
}