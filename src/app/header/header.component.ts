import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {AuthServiceService} from '../services/authorization/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {RoleGuardService} from '../services/authorization/role-guard-service.service';
import {go} from '../store';
import {ROUTES} from '../shared/constants/routes.const';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bodyText: string;
  isMenuShown: boolean;

  constructor(private dialog: MatDialog,
              private auth: AuthServiceService,
              private store: Store<{}>,) {
  }

  logInCheck(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

  adminCheck(): boolean {
    if (
      this.logInCheck() && isNotNullOrUndefined(localStorage.getItem('roles'))
    ) {
      if (localStorage.getItem('roles').includes('ADMIN')) {
        return true;
      }
    }
    return false;

  }



  redirect(path: string) {
    this.store.dispatch(go({path}))
    this.showHamburgerMenu();
  }

  onLogOut() {
    this.store.dispatch(go({path: ROUTES.home}))
    localStorage.removeItem('token');
    localStorage.setItem('roles', '');
    localStorage.setItem('email', '');
    this.showHamburgerMenu();
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
    this.checkWindowWidth();
  }

  openDialog() {
    this.dialog.open(LoginComponent);
    this.showHamburgerMenu();
  }
  showHamburgerMenu(): void {
    this.isMenuShown = !this.isMenuShown;
    if (window.innerWidth > 1000) {
      this.isMenuShown = true;
    }
  }
  checkWindowWidth(): void {
    this.isMenuShown = window.innerWidth > 1000;
  }
}
