import { Component, OnInit } from '@angular/core';
import {Info} from '../shared/registration';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

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
