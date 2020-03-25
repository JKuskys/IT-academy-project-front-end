import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../shared/blank-validator';

@Component({
  selector: 'app-admin-comment-write',
  templateUrl: './admin-comment-write.component.html',
  styleUrls: ['./admin-comment-write.component.scss']
})
export class AdminCommentWriteComponent implements OnInit {

  @Output() commentSave = new EventEmitter<string>();

  commentForm = this.fb.group({
    commentBody: [null, [
      Validators.required,
      blankValidator()
    ]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onCommentSaved() {
    this.commentSave.emit(this.commentForm.get('commentBody').value.trim());
  }
}
