import {Injectable} from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {go} from '../../store';
import {ROUTES} from '../../shared/constants/routes.const';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private jwtHelper: JwtHelperService= new JwtHelperService()

  constructor(private store: Store<{}>) {
  }

  onLogOut() {
    window.addEventListener('storage', (event) => {
        if (event.storageArea === localStorage) {
          const token = localStorage.getItem('token');
          if (!isNotNullOrUndefined(token)) {
            this.store.dispatch(go({path: ROUTES.home}))
          }
        }
      }
    );
  }

  onTokenExpired() {
    setInterval(() => {
      const token = localStorage.getItem('token');
      if (isNotNullOrUndefined(token)) {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('roles');
          this.store.dispatch(go({path: ROUTES.home}))
        }
      }
    }, 60 * 100);
  }
}
