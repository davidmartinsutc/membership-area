import { Section } from "../models/section.model";


export class Training {
    name: string;
    picture?: string;               //url de l'image après upload
    description_preview?: string;
    description_detail?: string;
    benefits_detail?: string;
    position?: number;
    sections?: Section[];
    image?: File;

    constructor(name: string, picture?: string, description_preview?: string, description_detail?: string, benefits_detail?: string, position?: number, sections?: Section[], image?: File) {
        this.name = name;
        this.picture = picture;
        this.description_preview = description_preview;
        this.description_detail = description_detail;
        this.benefits_detail = benefits_detail;
        this.position = position;
        this.sections = sections;
        this.image = image;
    }
}
