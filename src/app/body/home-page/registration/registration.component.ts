import {Component, OnInit, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';
import {CustomValidators} from '../../../services/universal/custom-validators';
import {PhoneNumberService} from '../../../services/universal/phone-number.service';
import {Store} from '@ngrx/store';
import {getSignUpError, getIsSignUpLoading, signUp, getIsSignUpLoaded, fetchPhoneNumbers} from '../../../store';
import {SignUpPayload} from '../../../shared/types/account';
import {Observable} from 'rxjs';
import {getPhoneNumbers} from '../../../store/selectors/common.selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public passwordNotMatch: boolean;
  public submission: boolean;

  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public phoneNumbers$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    private store: Store<{}>) {
    this.registrationForm = this.setForm();
  }

  ngOnInit(): void {
    this.phoneNumbers$ = this.store.select(getPhoneNumbers);
    this.isLoading$ = this.store.select(getIsSignUpLoading)
    this.error$ = this.store.select(getSignUpError)
    this.store.select(getIsSignUpLoaded).subscribe(
      (loaded) => {
        if(loaded) {
          this.registrationForm.reset();
          this.closeDialog();
        }
      });
  }

  public validatePasswords(): boolean {
    return !(this.password.value !== this.passwordRepeat.value && this.passwordRepeat.value !== '')
  }

  public onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    if (this.validatePasswords()) {
      const info: SignUpPayload = this.getMappedForm();
      this.store.dispatch(signUp({payload: info}))
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }

  public closeDialog() {
    this.registrationForm.reset();
    this.registrationForm = this.setForm();
    this.dialogRef.close(RegistrationComponent);
  }


  public isSelected(id: string) {
    const value = this.registrationForm.get(id).value;
    return value === 'true' || value === true;
  }

  private setForm() {
    return this.fb.group({
      firstAndLastName: ['', [
        Validators.required,
        Validators.minLength(1),
        // check if only valid letters
        CustomValidators.patternValidator(/^[a-žA-Ž\s]*$/, {hasLettersOnly: true}),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      phoneCode: ['+370', []],
      phoneNumber: ['', [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$'),
      ]],
      emailReg: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      schoolName: ['', [
        Validators.required,
        Validators.maxLength(255),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      hobbies: ['', [
        Validators.required,
        Validators.maxLength(1500),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      contract: [true, []],
      contractDescription: ['', [
        Validators.maxLength(1500),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      workTime: [true, []],
      drive: ['', [
        Validators.required,
        Validators.maxLength(1500),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      experience: ['', [
        Validators.required,
        Validators.maxLength(1500),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
      fromWhere: ['', [
        Validators.required,
        Validators.maxLength(1500),
        // check if there are only gaps
        CustomValidators.gapsOnly({hasGaps: true}),
      ]],
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
      ]],
      GDPR: ['', [
        Validators.required,
        CustomValidators.trueCheck({isTrue: true})
      ]]
    });
  }

  private getMappedForm() {
    return {
      phoneNumber: this.registrationForm.get('phoneCode').value + this.registrationForm.get('phoneNumber').value,
      education: this.registrationForm.get('schoolName').value,
      hobbies: this.registrationForm.get('hobbies').value,
      agreementNeeded: this.isSelected('contract'),
      comment: this.registrationForm.get('contractDescription').value,
      academyTimeSuitable: this.isSelected('workTime'),
      reason: this.registrationForm.get('drive').value,
      technologies: this.registrationForm.get('experience').value,
      source: this.registrationForm.get('fromWhere').value,
      applicationDate:
        new Date().getFullYear() + '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') + '-' +
        String(new Date().getDate()).padStart(2, '0'),
      user: {
        email: this.registrationForm.get('emailReg').value,
        password: this.registrationForm.get('passwordReg').value,
        passwordRepeat: this.registrationForm.get('passwordRepeatReg').value,
        fullName: this.registrationForm.get('firstAndLastName').value,
        admin: false,
      }
    }
  }

  get password() {
    return this.registrationForm.get('passwordReg');
  }

  get passwordRepeat() {
    return this.registrationForm.get('passwordRepeatReg');
  }

}
