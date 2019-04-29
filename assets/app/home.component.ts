import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { PanierService } from './services/panier.service';
import { User } from "./models/user.model";
import { Notification } from './models/notification.model';
import { Panier } from './models/panier.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    myuser: User;
    mypanier: Panier;
    howManyNewsNb: number;

    constructor(private userService: UserService, private panierService: PanierService, private route: Router) {
    }


    ngOnInit() {
        const userId = localStorage.getItem('userId');

        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.myuser = user;
                this.updateLastConnection(this.userService);
                this.howManyNewsNb = this.howManyNews(this.myuser);
                this.userService.myuser = this.myuser;
                this.myuser = this.userService.myuser;
            });

            this.mypanier = this.panierService.mypanier;

    }

    onLogout() {
        this.userService.logout();
        this.route.navigate(['/bye']);
        location.reload();
    }

    updateLastConnection(userServiceparam: UserService) {
        userServiceparam.updateLastConnection(this.myuser)
            .subscribe();
        setInterval(function () {
            userServiceparam.updateLastConnection(this.myuser)
                .subscribe();
        }, 180000);   //On update toute les 3 minutes
    }


    howLongAgo(notifDate: Date) {
        var seconds = (new Date().getTime() - notifDate.getTime()) / 1000;
        var minutes = Math.floor(seconds / 60);

        if (minutes >= 1440) {
            return Math.floor(minutes / 1440) + ' jours'
        }
        else if (minutes >= 60) {
            return Math.floor(minutes / 60) + ' heures'
        }
        else {
            return minutes + ' minutes'
        }
    }

    isNew(notifDate: Date, lastClickOnNews: Date) {
        if (notifDate.getTime() > lastClickOnNews.getTime()) {
            return true
        }
        else {
            return false
        }
    }

    onClickNews() {
        //On commence par updater la derniere connection
        this.userService.updateLastClickOnNews(this.myuser)
            .subscribe();
        //Puis on met à jours le myuser.lastClickOnNews
        this.myuser.lastClickOnNews = new Date();
    }

    howManyNews(myuser: User) {
        let newNotifs = 0;
        myuser.userNotifications.map(notifmap => {
            if (notifmap.date.getTime() > myuser.lastClickOnNews.getTime()) {
                newNotifs += 1;
                notifmap.isNew = true;
            }
        })
        return newNotifs;
    }

    onClickOneNews(notif: Notification) {
        notif.isNew = false;
        if (this.howManyNewsNb > 0) this.howManyNewsNb = this.howManyNewsNb - 1;
    }

    onToggleBar() {
        var navbar = (<HTMLInputElement>document.getElementById('main-nav'));
        var navul = (<HTMLInputElement>document.getElementById('nav-ul'));
        if (navbar.style.display == 'none') {
            navbar.style.display = 'block'
        }
        else navbar.style.display = 'none';

        if (navul.style.display == 'none') {
            navul.style.display = 'block'
        }
        else navul.style.display = 'none';
    }
}