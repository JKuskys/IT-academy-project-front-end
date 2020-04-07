import {Component, OnInit} from '@angular/core';
import {Application} from '../shared/application';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {CommentService} from '../services/application/comment.service';
import {JwtHelper} from '../services/universal/JwtHelper.service';
import {formatDate} from '@angular/common';

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

  addExternalCommentNotification(): void {
    this.application.isExternalComment = true;
    this.application.lastExternalCommentAuthor = localStorage.getItem('email');
    this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, this.application).subscribe();
  }

  onCommentSaved(input: string): void {
    this.isCommentLoading = true;
    this.addExternalCommentNotification();
    const newComment: Comment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input,
      visibleToApplicant: true,
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      this.comments.push(res);
      this.isCommentLoading = false;
    });
  }
}
