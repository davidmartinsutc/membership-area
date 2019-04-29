import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from "../services/user.service";

var jwt = require('jsonwebtoken');

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = jwt.decode(token);
    if (
      !this.userService.isLoggedIn() || 
      tokenPayload.role !== expectedRole
    ) {
      return false;
    }
    return true;
  }
}