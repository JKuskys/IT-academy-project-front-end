import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthServiceService} from '../Services/authorization/auth-service.service';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {RoleGuardService} from '../Services/authorization/role-guard-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bodyText: string;

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
  }

  onLogOut() {
    this.router.navigate(['home']).catch();
    localStorage.setItem('token', '');
    localStorage.setItem('roles', '');
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openDialog() {
    this.dialog.open(LoginComponent);
  }


}
