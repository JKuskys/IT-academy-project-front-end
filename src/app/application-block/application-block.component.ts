import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../shared/application';

@Component({
  selector: 'app-application-block',
  templateUrl: './application-block.component.html',
  styleUrls: ['./application-block.component.scss']
})
export class ApplicationBlockComponent implements OnInit {
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {

  }

}
