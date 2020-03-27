import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../shared/application';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

  noStatus(): boolean {
    if (this.application.status !== 'ATMESTA' &&
      this.application.status !== 'PRIIMTA') {
      return true;
    } else {
      return false;
    }
  }
  potential():boolean{
    if (this.application.status === 'POTENCIALUS' &&
      localStorage.getItem('roles').includes('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  noStatusAdmin(): boolean {
    if (this.noStatus() &&
      !this.potential() &&
      localStorage.getItem('roles').includes('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  noStatusUser(): boolean {
    if (this.noStatus() && localStorage.getItem('roles').includes('USER')) {
      return true;
    } else {
      return false;
    }
  }
}
