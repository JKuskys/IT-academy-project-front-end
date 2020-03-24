import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {AuthGuardService} from '../Services/auth-guard.service';
import {AuthServiceService} from '../Services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private bodyText: string;

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
