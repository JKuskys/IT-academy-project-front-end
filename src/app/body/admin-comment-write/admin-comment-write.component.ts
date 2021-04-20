import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {blankValidator} from '../../shared/types/blank-validator';
import {fileValidator} from '../../shared/types/file-validator';

@Component({
  selector: 'app-admin-comment-write',
  templateUrl: './admin-comment-write.component.html',
  styleUrls: ['./admin-comment-write.component.scss']
})
export class AdminCommentWriteComponent implements OnInit {

  @Output() commentSave = new EventEmitter();
  @Input() uploadEnabled: boolean;
  selectedFile: File;
  fileSelectedDefaultName = 'Pasirinkite failą...';

  commentForm = this.fb.group({
    commentBody: [null, [
      Validators.required,
      blankValidator()
    ]],
    attachment: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onFileNotSelected();
  }
  onFileNotSelected(): void {
    this.commentForm.value.attachment = null;
    this.selectedFile = null;
  }

  onCommentSaved() {
    this.commentForm.value.attachment = this.selectedFile;
    this.commentSave.emit(this.commentForm.value);
    this.selectedFile = null;

  }
  onFileSelected(event): void {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.commentForm.controls.attachment.setValidators(fileValidator(event.target.files));
      this.commentForm.controls.attachment.updateValueAndValidity();
      this.commentForm.controls.attachment.clearValidators();
    } else {
      this.onFileNotSelected();
    }
  }
}
