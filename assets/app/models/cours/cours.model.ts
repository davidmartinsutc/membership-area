import { Chapitre } from "./chapitre.model";

export class Cours {
    constructor(
        public titre: string,
        public lien: string,
        public description?: string,
        public coursID?: string,
        public chapitres?: Chapitre[]) { }
}