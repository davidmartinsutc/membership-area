import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}
  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      return false;
    }
    else {
      return true;
    }
  }
}