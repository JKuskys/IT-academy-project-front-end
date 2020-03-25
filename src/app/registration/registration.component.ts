import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Info} from '../shared/registration';
import {UserService} from '../Services/account/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SuccessfulRegistrationComponent} from '../successful-registration/successful-registration.component';
import {CustomValidators} from '../Services/universal/custom-validators';
import {PhoneNumberService} from '../Services/universal/phone-number.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  arrCodes: string[];
  info: Info;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialogRef<any>,
    private dialogNew: MatDialog,
    private phoneNumberService: PhoneNumberService) {
    this.registrationForm = this.setForm();
  }

  ngOnInit(): void {
    this.phoneNumberService.getPhoneCodes().subscribe(
      data => {
        this.arrCodes = data as string[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
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
      // id: Math.floor(Math.random() * 10),
      phoneNumber: this.registrationForm.get('phoneCode').value + this.registrationForm.get('phoneNumber').value,
      education: this.registrationForm.get('schoolName').value,
      hobbies: this.registrationForm.get('hobbies').value,
      agreement: this.getTrueFalse('contract'),
      comment: this.registrationForm.get('contractDescription').value,
      academy_time: this.getTrueFalse('workTime'),
      reason: this.registrationForm.get('drive').value,
      technologies: this.registrationForm.get('experience').value,
      source: this.registrationForm.get('fromWhere').value,
      applicationDate:
        new Date().getFullYear() + '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') + '-' +
        String(new Date().getDate()).padStart(2, '0'),
      user: {
        // id: Math.floor(Math.random() * 10),
        email: this.registrationForm.get('emailReg').value,
        password: this.registrationForm.get('passwordReg').value,
        passwordRepeat: this.registrationForm.get('passwordRepeatReg').value,
        fullName: this.registrationForm.get('firstAndLastName').value,
        admin: false,
      }
    };

    if (this.info.user.password === this.registrationForm.get('passwordRepeatReg').value) {
      this.userService.submitRegistration(this.info).subscribe(
        () => {
          this.serverErrorMessage = '';
          this.registrationForm.reset();
          this.closeDialog();
          this.openDialog();
        },
        error => (this.serverErrorMessage = error, this.isLoading = false)
      );
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }

  openDialog() {
    this.dialogNew.open(SuccessfulRegistrationComponent);
  }

  closeDialog() {
    this.registrationForm.reset();
    this.registrationForm = this.setForm();
    this.dialog.close(RegistrationComponent);
  }


  getTrueFalse(id: string) {
    const value = this.registrationForm.get(id).value;
    if (value === 'true' || value === true) {
      return true;
    } else {
      return false;
    }
  }

  setForm() {
    return this.fb.group({
      firstAndLastName: ['', [
        Validators.required,
        Validators.minLength(1),
      ]],
      phoneCode: ['+370', []],
      phoneNumber: ['', [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('[0-9 ]{1,8}'),
      ]],
      emailReg: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      schoolName: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      hobbies: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      contract: [true, []],
      contractDescription: ['', [
        Validators.maxLength(1500)
      ]],
      workTime: [true, []],
      drive: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      experience: ['', [
        Validators.required,
        Validators.maxLength(1500)
      ]],
      fromWhere: ['', [
        Validators.required,
        Validators.maxLength(1500)
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
      ]]
    });
  }

  get passwordReg() {
    return this.registrationForm.get('passwordReg');
  }

  get passwordRepeatReg() {
    return this.registrationForm.get('passwordRepeatReg');
  }
}
