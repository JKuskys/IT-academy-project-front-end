import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';


@Injectable()
export class RoleGuardService implements CanActivate {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public auth: AuthServiceService = new AuthServiceService();

  constructor(public router: Router) {
  }

  hasPermissions(permission: string): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = permission;
    const token: string = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token);
    let roles: string;
    if (isNotNullOrUndefined(tokenPayload)) {
      roles = JSON.stringify(tokenPayload.roles);
    } else {
      roles = '';
    }
    if (
      roles.includes(expectedRole) && this.auth.isAuthenticated()
    ) {
      return true;
    }
    this.router.navigate(['home']).catch();
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token: string = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token);
    let roles: string;
    if (isNotNullOrUndefined(tokenPayload)) {
      roles = JSON.stringify(tokenPayload.roles);
    } else {
      roles = '';
    }
    if (
      roles.includes(expectedRole) && this.auth.isAuthenticated()
    ) {
      return true;
    }
    this.router.navigate(['home']).catch();
    return false;
  }
}
