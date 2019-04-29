import { Component, OnInit } from "@angular/core";
import { Notification } from "../models/notification.model";
import { NotificationService } from "../services/notification.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-notifications',
    templateUrl: './admin-notifications.component.html'
})

export class AdminNotificationsComponent implements OnInit {
    notifications: Notification[];
    dateetheure: Date;
    mynotif: Notification;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {

        this.dateetheure = new Date();
        this.notificationService.getAllNotifications()
            .subscribe(
            (notifications: Notification[]) => {
                this.notifications = notifications;
            }
            );
    }

    onSubmit(addNotifForm: NgForm) {

        // Create
        const mynotif = new Notification(
            this.dateetheure,
            addNotifForm.value.notif_content,
            addNotifForm.value.notif_link,
            '',
            addNotifForm.value.notif_favicon
        );

        this.notificationService.create(mynotif)
            .subscribe(
            data => {
                this.notifications.push(mynotif);
            },
            error => console.error(error)
            );

        addNotifForm.resetForm();
        this.dateetheure = new Date();
    }


    notificationDelete(notification: Notification) {
        this.notificationService.deleteNotification(notification)
            .subscribe(
            result => {
                this.notifications.splice(this.notifications.indexOf(notification), 1);
            });
    }

    dateToParis(date: Date) {
        let datetime = date.toLocaleString("en-GB", { timeZone: "Europe/Paris" }).split(', ')[0];
        let hourtime = date.toLocaleString("en-GB", { timeZone: "Europe/Paris" }).split(', ')[1];
        let day = Number(datetime.split('/')[0]);
        let month = Number(datetime.split('/')[1]);
        let year = Number(datetime.split('/')[2]);
        let hour = Number(hourtime.split(':')[0]);
        let min = Number(hourtime.split(':')[1]);
        let sec = Number(hourtime.split(':')[2]);

        return new Date(year, month, day, hour, min, sec);
    }

}