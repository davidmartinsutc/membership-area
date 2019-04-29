export class Notification {
    constructor(public date: Date,
                public content: string,
                public link?: string,
                public notifID?: string,
                public favicon?: string,
                public isNew?: boolean) {}
}