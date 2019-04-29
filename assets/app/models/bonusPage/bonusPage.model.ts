import { Bonus } from "./bonus.model";

export class BonusPage {
    constructor(
        public titre: string,
        public description?: string,
        public bonusPageID?: string,
        public bonus?: Bonus[]) { }
}