import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.scss']
})
export class StudentCommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
