import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Info} from '../shared/registration';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import {switchMap} from 'rxjs/operators';
import {CommentService} from '../Services/comment.service';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {

  public application$: Observable<Info>;
  public comments$: Observable<Comment[]>;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.application$ = from(this.route.paramMap).pipe(
      switchMap(params => {
        return this.applicationService.getApplication({ id: params.get('id') });
      })
    );
    // TODO change to specific application comments later
    this.comments$ = this.commentService.getComments();
  }
  onCommentSaved(input: string): void {
    console.log('to do call to back to update comment with content: ' + input);
  }
}
