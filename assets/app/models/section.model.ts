export class Section {
    constructor(public position: number,
                public sectionName: string,
                public whatFor: string,
                public sectionID?: string,
                public nbItems?: number) {}
}