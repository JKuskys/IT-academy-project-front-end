import {Component, OnInit} from '@angular/core';
import {forkJoin, from, Observable, Subscription} from 'rxjs';
import {Registration} from '../shared/registration';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {switchMap} from 'rxjs/operators';
import {CommentService} from '../services/application/comment.service';
import {JwtHelper} from '../services/universal/JwtHelper.service';
import {formatDate} from '@angular/common';
import {Application} from '../shared/application';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {Status} from '../shared/status';

@Component({
  selector: 'app-admin-application-details',
  templateUrl: './admin-application-details.component.html',
  styleUrls: ['./admin-application-details.component.scss']
})
export class AdminApplicationDetailsComponent implements OnInit {
  isLoading = false;
  private routeSub: Subscription;
  application: Application;
  comments: Comment[];
  currentStatus?: string;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private commentService: CommentService, private jwtHelper: JwtHelper, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin(this.applicationService.getApplication({id: this.route.snapshot.paramMap.get('id')}),
      this.commentService.getComments({applicationId: this.route.snapshot.paramMap.get('id')}))
      .subscribe(res => {
        this.application = res[0];
        this.comments = res[1];
        this.updateApplicationToSeen();
        this.isLoading = false;
      });
  }
  updateApplicationToSeen(): void {
    if (this.application.status === Status.NAUJA) {
      this.application.status = Status.PERZIURETA;
      this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, this.application).subscribe();
    }
  }

  onCommentSaved(input: string, internal: boolean): void {
    const newComment: Comment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input,
      visibleToApplicant: !internal,
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      this.comments.push(res);
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
