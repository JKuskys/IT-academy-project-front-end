import {Component, OnInit} from '@angular/core';
import {Application} from '../shared/application';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {CommentService} from '../services/application/comment.service';
import {JwtHelper} from '../services/universal/JwtHelper.service';
import {formatDate} from '@angular/common';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  isLoading: boolean;
  isCommentLoading: boolean;
  public application: Application;
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private commentService: CommentService,
    private jwtHelper: JwtHelper
  ) {
    this.isLoading = true;
  }

  displayNumber = 5;

  increaseBy(nr: number) {
    this.displayNumber = this.displayNumber + nr;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isCommentLoading = false;
    this.applicationService.getProfileApplication({email: localStorage.getItem('email')}).subscribe(response => {
      this.application = response;
      this.commentService.getStudentComments({applicationId: this.application.id}).subscribe(data => {
        this.comments = data;
        this.isLoading = false;
      });

    });

  }

  isCommentsEmpty() {
    return this.comments && this.comments.length === 0;
  }

  onCommentSaved(input: any): void {
    this.isCommentLoading = true;
    const newComment: Comment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input.commentBody,
      visibleToApplicant: true,
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      this.comments.push(res);

      if (input.attachment) {
        this.commentService.addAttachment({applicationId: this.application.id, commentId: res.id, file: input.attachment})
          .subscribe(attachmentRes => {
            this.isCommentLoading = false;
            res.attachmentName = input.attachment.name;
          } );
      } else {
        this.isCommentLoading = false;
      }
    });
  }
  onAttachmentDownload(comment: Comment): void {
    this.commentService.getAttachment({applicationId: this.application.id, commentId: comment.id, file: comment.attachmentName})
      .subscribe(res => {
        saveAs(res, comment.attachmentName);
      } );
  }
}
