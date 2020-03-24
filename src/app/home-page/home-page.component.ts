import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import {Application} from '../shared/application';
import {AuthServiceService} from '../Services/auth-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private bodyText: string;

  constructor(private dialog: MatDialog,
              private auth: AuthServiceService) {
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
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
