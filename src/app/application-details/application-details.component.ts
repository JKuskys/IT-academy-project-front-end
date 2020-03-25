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
    if (this.application.status !== 'ATMESTA' && this.application.status !== 'PRIIMTA' && this.application.status !== 'POTENCIALUS') {
      return true;
    } else {
      return false;
    }
  }
}
