import { Section } from "../models/section.model";

export class Coupdecoeur {
    name: string;
    picture?: string;
    description?: string;
    sections?: Section[];
    image?: File;
    video?: string;
    second_title?: string;
    coupdecoeurID?: string;
    link_to_aff?: string;
    link_to_noaff?: string;


    constructor(name: string, picture?: string, description?: string, sections?: Section[],
        image?: File, video?: string, second_title?: string, coupdecoeurID?: string, link_to_aff?: string, link_to_noaff?: string) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.sections = sections;
        this.image = image;
        this.video = video;
        this.second_title = second_title;
        this.coupdecoeurID = coupdecoeurID;
        this.link_to_aff = link_to_aff;
        this.link_to_noaff = link_to_noaff;
    }
}
