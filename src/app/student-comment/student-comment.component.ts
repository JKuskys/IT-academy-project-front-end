import {Component, Input,Output,EventEmitter, OnInit} from '@angular/core';
import {Comment} from '../shared/comment';
import {CommentService} from '../Services/application/comment.service';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../shared/blank-validator';

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.scss']
})
export class StudentCommentComponent implements OnInit {
  public comments: Comment[];
  @Output() commentSave = new EventEmitter<Comment>();
  @Input() comment :Comment;
  constructor(private fb: FormBuilder) {
  }

  commentForm = this.fb.group({
    commentBody: [null, [
      Validators.required,
      blankValidator()
    ]]
  });


  ngOnInit(): void {
  }

  onCommentSaved() {
    this.comment.comment = this.commentForm.get('commentBody').value.trim();
    this.commentSave.emit(this.comment);
  }
}
