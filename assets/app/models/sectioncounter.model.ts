//Sert à compter l'occurence de chaque section

import { Section } from "../models/section.model";


export class SectionCounter {
    constructor(public section: Section,
                public nb?: number) {}
}