import { Application } from '../shared/application';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() applications: Application[];
}