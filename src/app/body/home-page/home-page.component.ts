import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from './registration/registration.component';
import {AuthServiceService} from '../../services/authorization/auth-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private auth: AuthServiceService) {
  }

  ngOnInit(): void {
  }

  logInCheck(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }

  openDialog() {
    this.dialog.open(RegistrationComponent);
  }
}
