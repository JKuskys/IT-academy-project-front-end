import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../shared/blank-validator';

@Component({
  selector: 'app-admin-comment-write',
  templateUrl: './admin-comment-write.component.html',
  styleUrls: ['./admin-comment-write.component.scss']
})
export class AdminCommentWriteComponent implements OnInit {

  @Output() commentSave = new EventEmitter<string>();
  @Input() uploadEnabled: boolean;
  fileSelected: string;
  fileSelectedDefault = 'Pasirinkite failą...';

  commentForm = this.fb.group({
    commentBody: [null, [
      Validators.required,
      blankValidator()
    ]],
    attachment: [null] // TODO add validation later
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onFileNotSelected();
  }
  onFileNotSelected(): void {
    this.fileSelected = this.fileSelectedDefault;
    this.commentForm.value.attachment = null;
  }

  onCommentSaved() {
    this.commentSave.emit(this.commentForm.get('commentBody').value.trim());
  }
  onFileSelected(event): void {
    if (event.target.files[0]) {
      this.fileSelected = event.target.files[0].name;
    } else {
      this.onFileNotSelected();
    }
  }
}
