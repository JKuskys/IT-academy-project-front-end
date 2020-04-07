import {Application} from '../shared/application';
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {Status} from '../shared/status';


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
        this.paginator._intl.itemsPerPageLabel = 'Paraiškų skaičius puslapyje';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
          }
          length = Math.max(length, 0);
          const startIndex = page * pageSize;
          const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} iš ${length}`;
        }
      },
      error => this.isLoading = false
    );
  }

  openApplication(element: Application) {
    this.router.navigate(['applications/' + element.id]);
  }

  get status() {
    return Status;
  }

  sameAuthor(author: string): boolean {
    if (author === localStorage.getItem('email')) {
      return true;
    } else {
      return false;
    }
  }

}
