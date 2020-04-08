import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Registration} from "../shared/registration";
import {UserService} from "../services/account/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PhoneNumberService} from "../services/universal/phone-number.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomValidators} from "../services/universal/custom-validators";
import {Info} from "../shared/info";
import {User} from "../shared/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  private info: User;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {
    this.resetPasswordForm = this.setForm();
  }

  ngOnInit(): void {
  }

  validatePasswords(): boolean {
    if (this.passwordReg.value !== this.passwordRepeatReg.value &&
      this.passwordRepeatReg.value !== '') {
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
      email: localStorage.getItem('resetPasswordEmail'),
      password: this.resetPasswordForm.get('passwordReg').value,
      passwordRepeat: this.resetPasswordForm.get('passwordRepeatReg').value,
    }

    if (this.info.password === this.resetPasswordForm.get('passwordRepeatReg').value) {
      this.userService.changePassword(this.info).subscribe(
        () => {
          this.serverErrorMessage = '';
          this.resetPasswordForm.reset();
          this.router.navigate(['home']);
        },
        error => (this.serverErrorMessage = error, this.isLoading = false)
      );
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }

  setForm() {
    return this.fb.group({
      passwordReg: ['', [
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
      passwordRepeatReg: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30)
      ]]
    });
  }

  get passwordReg() {
    return this.resetPasswordForm.get('passwordReg');
  }

  get passwordRepeatReg() {
    return this.resetPasswordForm.get('passwordRepeatReg');
  }
}
