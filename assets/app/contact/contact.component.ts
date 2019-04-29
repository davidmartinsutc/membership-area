import { Component, OnInit } from "@angular/core";
import { CommandeService } from '../services/commande.service';
import { User } from "../models/user.model";
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmailSenderService } from "../services/emailsender.service";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    myuser: User;
    messageForm: FormGroup;

    constructor(private userService: UserService, private emailSenderService: EmailSenderService, public router: Router) {
    }

    ngOnInit() {
        if (this.userService.myuser) {
            this.myuser = this.userService.myuser;
        }
        else {
            const userId = localStorage.getItem('userId');
            this.userService.getUserInfoById(userId)
                .subscribe((user) => {
                    this.myuser = user;
                });
        }

        this.messageForm = new FormGroup({
            message: new FormControl(null)
        });
    }

    sendMessage() {
        if (this.messageForm.value.message) {
            var message = new Object({
                message: this.messageForm.value.message,
                sender: this.myuser.email,
                firstName: this.myuser.firstName
            })
            this.emailSenderService.sendEmail(message).subscribe();

            var messageform = (<HTMLInputElement>document.getElementById('message'));
            messageform.value="";
           (<HTMLInputElement>document.getElementById('sended')).style.display='block';

        } else {
            console.log("Pas de Message");
        }
    }

}