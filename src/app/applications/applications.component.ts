import {Application} from '../shared/application';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {

  //data for testing
  applications: Application[];

  constructor() {
    this.applications = [{
      name: 'Testas Testauskas',
      application_date: '2020-09-01',
      comment_count: '0',
      seen: false,
      status: '',
    },
      {
        name: 'Testas Testauskas',
        application_date: '2020-09-01',
        comment_count: '10',
        seen: true,
        status: 'accepted',
      },
      {
        name: 'Testas Testauskas',
        application_date: '2020-09-01',
        comment_count: '3',
        seen: true,
        status: 'declined',
      },
      {
        name: 'Testas Testauskas',
        application_date: '2020-09-01',
        comment_count: '0',
        seen: false,
        status: 'possible',
      },
    ];
  }

  ngOnInit(): void {
  }
}
