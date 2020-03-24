import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Info} from '../shared/registration';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import {switchMap} from 'rxjs/operators';
import {Application} from '../shared/application';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {

  public application$: Observable<Application>;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.application$ = from(this.route.paramMap).pipe(
      switchMap(params => {
        return this.applicationService.getApplication({ id: params.get('id') });
      })
    );
  }
  onCommentSaved(input: string): void {
    console.log('to do call to back to update comment with content: ' + input);
  }
}
