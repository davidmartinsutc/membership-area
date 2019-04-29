import { SousChapitre } from "./sous-chapitre.model";

export class Chapitre {
    constructor(
        public titre: string,
        public sousChapitres?: SousChapitre[],
        public numero?: number,
        public description?: string
    ) { }
}