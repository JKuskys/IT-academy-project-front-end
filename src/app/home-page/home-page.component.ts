import {Component, OnInit} from '@angular/core';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import {Application} from '../shared/application';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private bodyText: string;
  //data for testing
  applications: Application[];

  constructor(private modalService: ModalService, private dialog: MatDialog) {
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
    this.bodyText = 'This text can be updated in modal 1';
  }

  openDialog() {
    this.dialog.open(RegistrationComponent);
  }
}
