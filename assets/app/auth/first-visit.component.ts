import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { UserService } from "../services/user.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../models/user.model";

import videojs from 'video.js';

@Component({
    selector: 'app-first-visit',
    templateUrl: './first-visit.component.html'
})
export class FirstVisitComponent implements OnInit {
    welcomeForm: FormGroup;
    token: string;
    user: User;
    email: string;

    // reference to the element itself, we use this to access events and methods
    private _elementRef: ElementRef

    // index to create unique ID for component
    @Input() idx: string;

    // video asset url
    @Input() url: any;

    // declare player var
    private player: any;

    constructor(private userService: UserService, private router: Router, elementRef: ElementRef) {
        this.url = false;
        this.player = false;
    }

    ngAfterViewInit() {

        // ID with which to access the template's video element
        let el = 'video_presentation';

        // setup the player via the unique element ID
        this.player = videojs(document.getElementById(el), {"controls": false, "autoplay": true}, function () {

            // Store the video object
            var myPlayer = this, id = myPlayer.id();

            // Make up an aspect ratio
            var aspectRatio = 264 / 640;

            // internal method to handle a window resize event to adjust the video player
            function resizeVideoJS() {
                var width = document.getElementById(id).parentElement.offsetWidth;
                myPlayer.width(width).height(width * aspectRatio);
            }

            // Initialize resizeVideoJS()
            resizeVideoJS();

            // Then on resize call resizeVideoJS()
            window.onresize = resizeVideoJS;
        });
    }

    onSubmitInfo() {

        var messageAlertEqual = (<HTMLInputElement>document.getElementById('messageAlertEqual'));
        var loading = (<HTMLInputElement>document.getElementById('loading'));

        if (this.welcomeForm.value.passwordChose == this.welcomeForm.value.passwordConfirm) {
            loading.style.display = "block"
            this.user = new User(this.email.trim().toLowerCase(), this.welcomeForm.value.passwordChose, this.welcomeForm.value.firstName, this.welcomeForm.value.lastName)
            this.userService.updatewithpassword(this.user, this.token)
                .subscribe(
                data => {
                    this.userService.signin(this.user)
                        .subscribe(
                        data => {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('userId', data.userId);
                            this.router.navigateByUrl('/');
                        },
                        error => console.error(error)
                        )
                },
                error => console.error(error)
                )
        }
        else {
            messageAlertEqual.innerHTML = "Les Mots de Passe de sont pas identiques"
        }
    }

    ngOnInit() {


        this.token = this.router.url.substring(this.router.url.indexOf("token=") + 6).split('&email=')[0];
        this.email = this.router.url.substring(this.router.url.indexOf("email=") + 6).split('&token=')[0];

        this.welcomeForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            passwordChose: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required)
        });
    }

    passwordLength(element: any) {
        var messageAlert = (<HTMLInputElement>document.getElementById('messageAlert'));
        var pass1 = (<HTMLInputElement>document.getElementById(element));

        if (pass1.value.length < 8) messageAlert.innerHTML = "Le mot de passe doit faire au moins 8 caractères";
        else messageAlert.innerHTML = "&nbsp; &nbsp;";
    }

    passwordEqual(element1: any, element2: any) {
        var messageAlertEqual = (<HTMLInputElement>document.getElementById('messageAlertEqual'));
        var pass1 = (<HTMLInputElement>document.getElementById(element1));
        var pass2 = (<HTMLInputElement>document.getElementById(element2));

        if (pass1.value != pass2.value) messageAlertEqual.innerHTML = "Les mots de passe sont différents";
        else messageAlertEqual.innerHTML = "&nbsp; &nbsp;";
    }

    userIsLogged() {
        return this.userService.isLoggedIn();
    }
}