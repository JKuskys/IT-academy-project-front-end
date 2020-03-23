import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Info} from '../shared/registration';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {

  public application$: Observable<Info>;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.application$ = from(this.route.paramMap).pipe(
      switchMap(params => {
        return this.applicationService.getApplication({ id: params.get('id') });
      })
    );
  }
}
