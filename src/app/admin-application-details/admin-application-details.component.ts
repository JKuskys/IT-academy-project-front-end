import {Component, OnInit} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
import {Info} from '../shared/registration';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application/application.service';
import {switchMap} from 'rxjs/operators';
import {CommentService} from '../Services/application/comment.service';
import {JwtHelper} from '../Services/universal/JwtHelper.service';
import {formatDate} from '@angular/common';
import {Application} from '../shared/application';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {
  isLoading = false;
  private routeSub: Subscription;
  public application: Application;
  public comments: Comment[];
  public currentStatus?: string;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private commentService: CommentService, private jwtHelper: JwtHelper, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.applicationService.getApplication({id: params.id}).subscribe(data => {
        this.commentService.getComments({applicationId: this.route.snapshot.paramMap.get('id')}).subscribe(commentData => {
          this.application = data;
          this.comments = commentData;
          this.isLoading = false;
          if (this.application.status === 'NAUJA') {
            this.application.status = 'PERZIURETA';
            this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, this.application).subscribe();
          }
        });
      });
    });
  }

  onCommentSaved(input: string): void {
    let newComment: Comment;
    newComment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      newComment = res;
      this.comments.push(newComment);
    });
  }

  onStatusSaved(application: Application): void {
    if (this.currentStatus) {
      application.status = this.currentStatus;
      this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, application)
        .subscribe(res => {
          const config = new MatSnackBarConfig();
          config.duration = 2000;
          this.snackBar.open('Būsena išsaugota!', '', config);
        });
    }
  }

  onStatusChange(value: string): void {
    this.currentStatus = value;
  }

  isCommentEditable(commentAuthor: string): boolean {
    return commentAuthor === this.jwtHelper.decodeToken(localStorage.getItem('token')).sub;
  }

  onCommentEdited(comment: Comment): void {
    this.commentService.updateComment(comment, { applicationId: this.application.id }).subscribe();
  }
  onCommentDeleted(id: number): void {
    this.commentService.deleteComment({applicationId: this.application.id, commentId: id}).subscribe(res => {
      this.comments = this.comments.filter((value, index, arr) => value.id !== id);
    });
  }
}
