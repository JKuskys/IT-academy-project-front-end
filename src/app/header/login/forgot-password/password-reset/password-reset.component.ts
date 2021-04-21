import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordResetPayload} from '../../../../shared/types/account';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/account/user.service';
import {MatDialog} from '@angular/material/dialog';
import {CustomValidators} from '../../../../services/universal/custom-validators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  private info: PasswordResetPayload;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;
  isLoading = false;
  paramsId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog) {
    this.resetPasswordForm = this.setForm();
    this.paramsId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  validatePasswords(): boolean {
    if (this.passwordReset.value !== this.passwordRepeatReset.value &&
      this.passwordRepeatReset.value !== '') {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.isLoading = true;
    this.info = {
      id: this.paramsId,
      newPassword: this.resetPasswordForm.get('passwordReset').value,
      newPasswordRepeat: this.resetPasswordForm.get('passwordRepeatReset').value,
    }

    if (this.info.newPassword === this.resetPasswordForm.get('passwordRepeatReset').value) {
      // this.userService.changePassword(this.info).subscribe(
      //   () => {
      //   },
      //   error => {
      //     if (error.toString() === '200') {
      //       this.serverErrorMessage = '';
      //       this.resetPasswordForm.reset();
      //       this.dialog.open(PasswordChangedComponent,{ disableClose: true });
      //     } else {
      //       this.serverErrorMessage = 'Atsiprašome, bet bandykite veliau dar kartą';
      //       this.isLoading = false;
      //     }
      //   }
      // );
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }

  setForm() {
    return this.fb.group({
      passwordReset: ['', [
        Validators.required,
        Validators.maxLength(30),
        // 1. check if it's longer than 7 symbols
        Validators.minLength(7),
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        // 5. check if there are no gaps
        CustomValidators.patternValidator(/^\S*$/, {hasGaps: true}),
      ]],
      passwordRepeatReset: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30)
      ]]
    });
  }

  get passwordReset() {
    return this.resetPasswordForm.get('passwordReset');
  }

  get passwordRepeatReset() {
    return this.resetPasswordForm.get('passwordRepeatReset');
  }
}
