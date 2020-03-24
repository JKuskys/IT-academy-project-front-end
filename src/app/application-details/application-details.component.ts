import {Component, Input, OnInit} from '@angular/core';
import {Info} from '../shared/registration';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

 @Input() application: Info;

  constructor() { }

  ngOnInit(): void {
    // TODO ONLY TEMPORARY UNTIL BACK IS DONE
    this.application = {
      fullName: 'string', phoneNumber: 'string', education: 'string', hobbies: 'string', agreement: true, comment: 'string',
        academy_time: true, reason: 'string', technologies: 'string', source: 'string', applicationDate: 'string',
        user: {
          email: 'string',
          password: 'string',
          passwordRepeat: 'string',
          admin: false
        }
    };
  }
}
