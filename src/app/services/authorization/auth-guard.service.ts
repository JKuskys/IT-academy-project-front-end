import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import {go} from '../../store';
import {ROUTES} from '../../shared/constants/routes.const';
import {Store} from '@ngrx/store';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthServiceService, public store: Store<{}>) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.store.dispatch(go({path: ROUTES.home}))
      return false;
    }
    return true;
  }
}
