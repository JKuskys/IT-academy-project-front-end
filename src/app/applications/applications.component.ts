import {Application} from '../shared/application';
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

const data: Application[] = [
  {name: 'Testas Testauskas',
  application_date: '2020-09-04',
  comment_count: '20',
  seen: false,
  status: 'declined',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '10',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  seen: false,
  status: '',},
];
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {

  //data for testing
  
  displayedColumns: string[] = ['name', 'application_date', 'comment_count', 'seen','status','action'];

  dataSource = new MatTableDataSource<Application>(data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;


  constructor() {
  }


  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

}
