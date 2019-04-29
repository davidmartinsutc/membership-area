import { Component, OnInit } from "@angular/core";
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'app-auth',
    template: `<router-outlet></router-outlet>`
})

export class AuthComponent implements OnInit {
    constructor(public router: Router) { }

    ngOnInit() {
        if ((window.location.pathname != '/resetpassword') && (window.location.pathname != '/welcome')) {
            this.router.navigate(['login']);
        }
    }
}