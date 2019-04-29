import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public userService: UserService, public router: Router) { }
  canActivate(): boolean {

    if (!this.userService.isLoggedIn()) {
      return false;
    }

    if (!(this.userService.myuser.proxy == '3000')) {
      return false;
    }
    return true;
  }
}