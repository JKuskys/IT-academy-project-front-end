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
  }
}
