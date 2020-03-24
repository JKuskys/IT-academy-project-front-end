import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.scss']
})
export class AdminCommentComponent implements OnInit {

  @Input() comment: Comment;
  constructor() { }

  ngOnInit(): void {
  }

}
