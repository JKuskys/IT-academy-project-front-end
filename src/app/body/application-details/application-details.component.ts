import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../shared/types/application';
import {Status} from '../../shared/types/status';

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
    if (this.application.status !== Status.ATMESTA &&
      this.application.status !== Status.PRIIMTA) {
      return true;
    } else {
      return false;
    }
  }

  potential(): boolean {
    if (this.application.status === Status.POTENCIALUS &&
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

  get status() {
    return Status;
  }
}
