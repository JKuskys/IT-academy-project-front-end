import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

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
    ]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onCommentSaved() {
    console.log(this.commentForm.get('commentBody').value);
    this.commentSave.emit(this.commentForm.get('commentBody').value);
  }
}
