import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Notification } from "../models/notification.model";

import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class NotificationService {
    private notifications: Notification[] = [];

    constructor(private http: Http, private errorService: ErrorService) { }



    create(notification: Notification) {
        const body = JSON.stringify(notification);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(environment.siteUrl+'/notification', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const notification = new Notification(
                    new Date(result.obj.date),
                    result.obj.content,
                    result.obj.link,
                    result.obj._id,
                    result.obj.favicon
                );
                this.notifications.push(notification);
                return notification;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getAllNotifications() {
        return this.http.get(environment.siteUrl+'/notification/')
            .map((response: Response) => {
                const notifications = response.json().obj;
                let notificationList: Notification[] = [];
                for (let notification of notifications) {
                    notificationList.push(new Notification(
                        new Date(notification.date),
                        notification.content,
                        notification.link,
                        notification._id,
                        notification.favicon)
                    );
                }
                return notificationList;
            })
            .catch(error => {
                return Observable.throw('Erreur dans getAllNotifications');
            });
    }


    getAllNotificationsSinceDate(lastConnecion: Date) {
        return this.http.get(environment.siteUrl+'/notification/' + lastConnecion)
            .map((response: Response) => {
                const notifications = response.json().obj;
                let notificationList: Notification[] = [];
                for (let notification of notifications) {
                    notificationList.push(new Notification(
                        new Date(notification.date),
                        notification.content,
                        notification.link,
                        notification._id,
                        notification.favicon)
                    );
                }
                return notificationList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteNotification(notification: Notification) {
        return this.http.delete(environment.siteUrl+'/notification/' + notification.notifID)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}