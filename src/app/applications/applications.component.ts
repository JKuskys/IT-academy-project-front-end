import {Application} from '../shared/application';
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {element} from 'protractor';
import {Observable} from 'rxjs';
import {ApplicationService} from '../Services/application/application.service';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {
  isLoading = true;

  displayedColumns: string[] = ['applicationDate', 'fullName', 'status', 'commentCount', 'action'];

  dataSource = new MatTableDataSource<Application>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private router: Router,
              private applicationService: ApplicationService) {

  }


  ngOnInit(): void {
    this.applicationService.getApplications().subscribe(data => {
      this.isLoading = false;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => this.isLoading = false

    );
  }

  openApplication(element: Application) {
    this.router.navigate(['applications/' + element.id]);
  }



}
