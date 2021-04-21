import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {go} from '../../store';
import {ROUTES} from '../../shared/constants/routes.const';
import {Store} from '@ngrx/store';



@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public auth: AuthServiceService = new AuthServiceService();

  constructor(public store: Store<{}>) {
  }

  setRole(token: string) {
    const tokenPayload = this.jwtHelper.decodeToken(token);
    if (tokenPayload) {
      localStorage.setItem('roles', JSON.stringify(tokenPayload.roles));
    } else {
      localStorage.setItem('roles', '');
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token: string = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.jwtHelper.decodeToken(token);
    let roles: string;
    if (tokenPayload) {
      roles = JSON.stringify(tokenPayload.roles);
    } else {
      roles = '';
    }
    if (
      roles.includes(expectedRole) && this.auth.isAuthenticated()
    ) {
      return true;
    }
    this.store.dispatch(go({path: ROUTES.home}))
    return false;
  }
}
