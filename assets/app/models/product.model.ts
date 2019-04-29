import { Section } from "../models/section.model";
import { Testimonial } from "../models/testimonial.model";

export class Product {
    name: string;
    picture?: string;               //url de l'image après upload
    description_preview?: string;
    description_detail?: string;
    benefits_detail?: string;
    position?: number;
    sections?: Section[];
    image?: File;
    whatFor?: string;
    price?: number;
    value?: number;
    activated?: boolean;
    video?: string;
    duree?: string;
    maj?: Date;
    second_title?: string;
    linked_trainings?: Product[];
    linked_products?: Product[];
    testimonials?: Testimonial[];
    productID?: string;
    fa_title?: string;
    link_to?: string;
    offered_trainings?: Product[];
    formationProduit?: String;
    downloadableBonus?: String;
    iframelink?: String;


    constructor(name: string, whatFor?: string, picture?: string, description_preview?: string, description_detail?: string, benefits_detail?: string, position?: number, sections?: Section[], 
        image?: File, price?: number, value?: number, activated?: boolean, video?: string, duree?: string, maj?: Date, second_title?: string, linked_trainings?: Product[], linked_products?: Product[], 
        testimonials?: Testimonial[], productId?: string, fa_title?: string, link_to?: string, offered_trainings?: Product[], formationProduit?: String, downloadableBonus?: String, iframelink?: String) {
        this.name = name;
        this.whatFor = whatFor;
        this.picture = picture;
        this.description_preview = description_preview;
        this.description_detail = description_detail;
        this.benefits_detail = benefits_detail;
        this.position = position;
        this.sections = sections;
        this.image = image;
        this.price = price;
        this.value = value;
        this.activated = activated;
        this.video = video;
        this.duree = duree;
        this.maj = maj;
        this.second_title = second_title;
        this.linked_trainings = linked_trainings;
        this.linked_products = linked_products;
        this.testimonials = testimonials;
        this.productID = productId;
        this.fa_title = fa_title;
        this.link_to = link_to;
        this.offered_trainings = offered_trainings;
        this.formationProduit = formationProduit;
        this.downloadableBonus = downloadableBonus;
        this.iframelink = iframelink;
    }
}
