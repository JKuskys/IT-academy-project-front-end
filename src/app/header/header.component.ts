import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthGuardService} from '../Services/auth-guard.service';
import {AuthServiceService} from '../Services/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bodyText: string;
  private jwtHelper: JwtHelperService;

  constructor(private dialog: MatDialog,
              private auth: AuthServiceService,
              private  router: Router) {
  }

  logInCheck(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

  adminCheck(): boolean {
    const expectedRole = 'ADMIN';
    // decode the token to get its payload
    let token: string;
    let tokenPayload: any;
    // decode the token to get its payload
    try {
      token = localStorage.getItem('token');
      tokenPayload = this.jwtHelper.decodeToken(token);
    } catch (e) {
      tokenPayload = null;
    }
    let roles: any;
    if (isNotNullOrUndefined(tokenPayload)) {
      roles = JSON.stringify(tokenPayload.roles);
    } else {
      roles = '';
    }
    console.log(roles);
    if (
      roles.includes(expectedRole) && this.logInCheck()
    ) {
      return true;
    }
    return false;
  }

  openApplications() {
    this.router.navigate(['applications']).catch();
  }

  onLogOut() {
    this.router.navigate(['home']).catch();
    localStorage.setItem('token', '');

  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }


}
