import {Component, OnInit, ViewChild} from '@angular/core';
import {forkJoin, from, Observable, Subscription} from 'rxjs';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {CommentService} from '../services/application/comment.service';
import {JwtHelper} from '../services/universal/JwtHelper.service';
import {formatDate} from '@angular/common';
import {Application} from '../shared/application';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Status} from '../shared/status';
import {saveAs} from 'file-saver';

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
  isFeedbackCommentLoading: boolean;
  isInternalCommentLoading: boolean;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private commentService: CommentService, private jwtHelper: JwtHelper, private snackBar: MatSnackBar) {
  }

  displayNumber = 5;

  increaseBy(nr: number){
    this.displayNumber= this.displayNumber+nr;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isFeedbackCommentLoading = false;
    this.isInternalCommentLoading = false;
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


  onCommentSaved(input: any, internal: boolean): void {
    this.setCommentLoading(internal, true);
    const newComment: Comment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input.commentBody,
      visibleToApplicant: !internal,
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      this.comments.push(res);
      if (input.attachment) {
        this.commentService.addAttachment({applicationId: this.application.id, commentId: res.id, file: input.attachment})
          .subscribe(attachmentRes => {
            this.setCommentLoading(internal, false);
            res.attachmentName = input.attachment.name;
          } );
      } else {
        this.setCommentLoading(internal, false);
      }
    });
  }

  setCommentLoading(internal: boolean, value: boolean) {
    if (!internal) {
      this.isFeedbackCommentLoading = value;
    } else {
      this.isInternalCommentLoading = value;
    }
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
    this.commentService.updateComment(comment, {applicationId: this.application.id}).subscribe();
  }

  onCommentDeleted(id: number): void {
    this.commentService.deleteComment({applicationId: this.application.id, commentId: id}).subscribe(res => {
      this.comments = this.comments.filter((value, index, arr) => value.id !== id);
    });
  }
  onAttachmentDownload(comment: Comment): void {
    this.commentService.getAttachment({applicationId: this.application.id, commentId: comment.id, file: comment.attachmentName})
      .subscribe(res => {
        saveAs(res, comment.attachmentName);
      } );
  }
}
