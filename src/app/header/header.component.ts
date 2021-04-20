import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../body/login/login.component';
import {AuthServiceService} from '../services/authorization/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {RoleGuardService} from '../services/authorization/role-guard-service.service';

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
              private  router: Router,
              private roleGuardService: RoleGuardService) {
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
    this.router.navigate([path]).catch();
    this.showHamburgerMenu();
  }

  onLogOut() {
    this.router.navigate(['home']).catch();
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
