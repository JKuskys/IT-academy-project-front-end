import {Component, OnInit} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
import {Info} from '../shared/registration';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../Services/application.service';
import {switchMap} from 'rxjs/operators';
import {CommentService} from '../Services/comment.service';
import {JwtHelper} from '../Services/JwtHelper.service';
import {formatDate} from '@angular/common';
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
  public comments$: Observable<Comment[]>;
  public currentStatus?: string;

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
              private commentService: CommentService, private jwtHelper: JwtHelper) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.applicationService.getApplication({id: params.id}).subscribe(data => {
        this.application = data;
        this.isLoading = false;
        if (this.application.status === 'NAUJA') {
          this.application.status = 'PERZIURETA';
          this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, this.application).subscribe();
        }
      });
    });
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
    // TODO post to backend here AND get only one comment
    console.log(newComment);
    this.commentService.addComment(newComment).subscribe(res => {
      this.comments$ = this.commentService.getComments();
    });
  }

  onStatusSaved(application: Application): void {
    if (this.currentStatus) {
      application.status = this.currentStatus;
      this.applicationService.updateApplication({id: this.route.snapshot.paramMap.get('id')}, application)
        .subscribe(res => {
          console.log('Saved'); /* TODO maybe add some saved status message? */
        });
    }
  }

  onStatusChange(value: string): void {
    this.currentStatus = value;
  }

  isCommentEditable(commentAuthor: string): boolean {
    return commentAuthor === this.jwtHelper.decodeToken(localStorage.getItem('token')).sub;
  }

  onCommentEdited(comment: string): void {
    // TODO get update from backend
    console.log('save to DB');
  }
}
