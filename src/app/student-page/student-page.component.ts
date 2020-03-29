import {Component, OnInit} from '@angular/core';
import {Application} from '../shared/application';
import {Comment} from '../shared/comment';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../services/application/application.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  isLoading = false;
  public application: Application;
  public comments: Comment[];

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationService.getProfileApplication({email: localStorage.getItem('email')}).subscribe(response => {
      this.application = response;
      this.isLoading = false;
    });
    // TODO get comments from back
    /*
    this.commentService.getComments().subscribe(data => {

      // this.comments = data;
      this.isLoading = false;
    });*/
  }

  commentsEmpty() {
    if (isNotNullOrUndefined(this.comments)) {
      return false;
    } else {
      return true;
    }
  }

}
