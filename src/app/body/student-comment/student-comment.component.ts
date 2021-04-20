import {Component, Input,Output,EventEmitter, OnInit} from '@angular/core';
import {Comment} from '../../shared/types/comment';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../../shared/types/blank-validator';

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.scss']
})
export class StudentCommentComponent implements OnInit {
  public comments: Comment[];
  @Output() commentSave = new EventEmitter<Comment>();
  @Input() comment: Comment;
  @Output() attachmentDownload = new EventEmitter<Comment>();

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

  onDownload() {
    this.attachmentDownload.emit(this.comment);
  }
}
