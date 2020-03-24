import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Info} from '../shared/registration';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import {switchMap} from 'rxjs/operators';
import {CommentService} from '../Services/comment.service';
import { JwtHelper } from '../Services/JwtHelper.service';
import { formatDate } from '@angular/common';
import {Application} from '../shared/application';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {

  public application$: Observable<Application>;
  public comments$: Observable<Comment[]>;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private commentService: CommentService, private jwtHelper: JwtHelper) { }

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
    let newComment: Comment;
    newComment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input,
      applicationId: 1 // TODO change later
    };
    // TODO post to backend here
    console.log(newComment);
    this.commentService.addComment(newComment).subscribe(res => { this.comments$ = this.commentService.getComments(); });
  }
}
