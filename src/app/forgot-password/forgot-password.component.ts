import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/account/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmailSentComponent} from "../email-sent/email-sent.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  serverErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,) {
    this.resetForm = this.setForm();
  }


  ngOnInit(): void {
    this.serverErrorMessage = '';
  }

  onSubmit() {

    this.isLoading = true;
    this.userService.sendEmail(this.resetForm.get('emailReset').value).subscribe(response => {
      },
      error => {
        if (error === 'Access Denied') {
          this.serverErrorMessage = 'Neteisingas el. paštas';
        } else {
          this.closeDialog('forgotPassword');
          this.dialog.open(EmailSentComponent);
        }
        this.isLoading = false;
      }
    );
  }

  closeDialog(id: string) {
    this.dialogRef.close(id);
  }


  setForm() {
    return this.fb.group({
      emailReset: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
    });
  }
}

