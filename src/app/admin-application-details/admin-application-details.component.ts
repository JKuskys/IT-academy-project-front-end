import {Component, OnInit} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
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
  isLoading = false;
  private routeSub: Subscription;
  public application: Application;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.applicationService.getApplication({id: params['id']}).subscribe(data => {
        this.application = data;
        this.isLoading=false;
      });
    });
  }

  onCommentSaved(input: string): void {
    console.log('to do call to back to update comment with content: ' + input);
  }
}
