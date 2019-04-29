import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private userService: UserService, private route: Router) { }

    userIsLogged() {
        return this.userService.isLoggedIn();
    }
}