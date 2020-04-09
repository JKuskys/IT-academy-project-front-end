import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit {

  constructor(private dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialog.close(EmailSentComponent);
  }
}
