import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../../shared/types/comment';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../../../shared/types/blank-validator';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.scss']
})
export class AdminCommentComponent implements OnInit {

  @Input() comment: Comment;
  inEditMode: boolean;
  @Input() isEditable: boolean;
  @Output() commentSave = new EventEmitter<Comment>();
  @Output() commentDelete = new EventEmitter<number>();
  @Output() attachmentDownload = new EventEmitter<Comment>();

  constructor(private fb: FormBuilder) { }

  commentForm = this.fb.group({
    commentBody: [null, [
      Validators.required,
      blankValidator()
    ]]
  });

  ngOnInit(): void {
    this.inEditMode = false;
  }
  switchEditMode(): void {
    this.inEditMode = !this.inEditMode;
    if (this.inEditMode) {
      this.commentForm.get('commentBody').setValue(this.comment.comment);
    }
  }
  onCommentSaved() {
    this.comment.comment = this.commentForm.get('commentBody').value.trim();
    this.commentSave.emit(this.comment);
  }
  onCommentDeleted() {
    this.commentDelete.emit(this.comment.id);
  }
  onDownload() {
    this.attachmentDownload.emit(this.comment);
  }
}
