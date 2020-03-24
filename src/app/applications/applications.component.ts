import {Application} from '../shared/application';
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
const data: Application[] = [
  {name: 'Bestas Testausk',
  application_date: '2020-09-04',
  comment_count: '20',
  status: 'declined',},
  {name: 'Testas Testas',
  application_date: '2020-09-01',
  comment_count: '10',
  status: 'seen',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: 'new',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: 'accepted',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: 'seen',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
  {name: 'Testas Testauskas',
  application_date: '2020-09-01',
  comment_count: '0',
  status: '',},
];
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {

  //data for testing
  
  displayedColumns: string[] = [ 'application_date','name','status', 'comment_count','action'];

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
