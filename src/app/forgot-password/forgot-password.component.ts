import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/account/user.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  serverErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<any>) {
    this.loginForm = this.setForm();
  }


  ngOnInit(): void {
    this.serverErrorMessage = '';
  }

  onSubmit() {

    this.isLoading = true;
    this.userService.sendEmail(this.loginForm.get('emailLogin').value).subscribe(
      response => {
        this.closeDialog('forgotPassword');
        localStorage.setItem('resetPasswordEmail', this.loginForm.get('emailLogin').value);
      },
      error => {
        if (error === 'Access Denied') {
          this.serverErrorMessage = 'Neteisingas el. paštas';
        } else {
          this.serverErrorMessage = error;
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
      emailLogin: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
    });
  }
}

