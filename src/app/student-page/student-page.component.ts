import {Component, OnInit} from '@angular/core';
import {Application} from '../shared/application';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {CommentService} from '../services/application/comment.service';
import {JwtHelper} from '../services/universal/JwtHelper.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  isLoading:boolean;
  public application: Application;
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private commentService: CommentService,
    private jwtHelper: JwtHelper
  ) {
    this.isLoading=true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationService.getProfileApplication({email: localStorage.getItem('email')}).subscribe(response => {
      this.application = response;
      this.commentService.getStudentComments({applicationId: this.application.id}).subscribe(data => {
        this.comments = data;
        this.isLoading = false;
      });

    });

  }

  commentsEmpty() {
    if (isNotNullOrUndefined(this.comments)) {
      return false;
    } else {
      return true;
    }
  }

  onCommentSaved(input: string): void {
    const newComment: Comment = {
      authorEmail: this.jwtHelper.decodeToken(localStorage.getItem('token')).sub,
      commentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      comment: input,
      visibleToApplicant: true,
    };
    this.commentService.addComment(newComment, {applicationId: this.application.id}).subscribe(res => {
      this.comments.push(res);
    });
  }
}
