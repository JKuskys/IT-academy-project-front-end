import {Component, OnInit} from '@angular/core';
import {SessionService} from './services/authorization/session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IT-academy-project-front-end';

  constructor(private sessionService: SessionService) {
  }


  ngOnInit() {
    this.sessionService.onLogOut();
  }

}
