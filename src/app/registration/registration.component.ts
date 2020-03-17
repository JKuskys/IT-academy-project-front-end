import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Info} from '../shared/registration';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    firstAndLastName: ['', [
      Validators.required,
      Validators.minLength(1),
    ]],
    phoneCode: ['', []],
    phoneNumber: ['', [
      Validators.required,
      Validators.maxLength(8),
      Validators.pattern('[0-9 ]{1,8}'),
    ]],
    emailReg: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
    ]],

    schoolName: ['', [
      Validators.required,
      Validators.maxLength(200)
    ]],
    hobbies: ['', [
      Validators.required,
      Validators.maxLength(1500)
    ]],
    contract: [false, []],
    contractDescription: ['', [
      Validators.maxLength(1500)
    ]],
    workTime: [false, []],
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
      Validators.maxLength(256)
    ]],
    passwordReg: ['', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),

      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,30}')
    ]],
    passwordRepeatReg: ['', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]]
  });

  constructor(private fb: FormBuilder, private httpService: HttpClient, private userService: UserService) {
  }

  arrCodes: string[];
  info: Info;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;

  ngOnInit(): void {
    this.httpService.get('./assets/phone-codes.json').subscribe(
      data => {
        this.arrCodes = data as string[];
        // console.log(this.arrCodes);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  validatePasswords(): boolean {
    if (this.passwordReg.value !== this.passwordRepeatReg.value && this.passwordReg.value !== '' && this.passwordRepeatReg.value !== '') {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.info = {
      // id: Math.floor(Math.random() * 10),
      name: this.firstAndLastName.value,
      phone_number: this.phoneCode.value + this.phoneNum.value,
      education: this.schoolName.value,
      free_time: this.hobbies.value,
      agreement: this.contract.value,
      comment: this.contractDescription.value,
      academy_time: this.workTime.value,
      reason: this.drive.value,
      technologies: this.experience.value,
      source: this.fromWhere.value,
      application_date:
        new Date().getFullYear() + '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') + '-' +
        String(new Date().getDate()).padStart(2, '0'),
      user: {
        // id: Math.floor(Math.random() * 10),
        email: this.email.value,
        password: this.passwordReg.value,
        passwordRepeat: this.passwordRepeatReg.value,
        admin: false
      }
    };

    if (this.info.user.password == this.info.user.passwordRepeat) {
      this.userService.submitRegistration(this.info).subscribe(
        () => {
          this.serverErrorMessage = '';
        },
        error => (this.serverErrorMessage = error)
      );
      this.registrationForm.reset();
    } else {
      this.passwordNotMatch = true;
      this.submission = false;
    }
  }


  get firstAndLastName() {
    return this.registrationForm.get('firstAndLastName');
  }

  get email() {
    return this.registrationForm.get('emailReg');
  }

  get phoneCode() {
    return this.registrationForm.get('phoneCode');
  }

  get phoneNum() {
    return this.registrationForm.get('phoneNumber');
  }

  get schoolName() {
    return this.registrationForm.get('schoolName');
  }

  get hobbies() {
    return this.registrationForm.get('hobbies');
  }

  get workTime() {
    return this.registrationForm.get('workTime');
  }

  get contractDescription() {
    return this.registrationForm.get('contractDescription');
  }

  get drive() {
    return this.registrationForm.get('drive');
  }

  get experience() {
    return this.registrationForm.get('experience');
  }

  get fromWhere() {
    return this.registrationForm.get('fromWhere');
  }

  get contract() {
    return this.registrationForm.get('contract');
  }

  get passwordReg() {
    return this.registrationForm.get('passwordReg');
  }

  get passwordRepeatReg() {
    return this.registrationForm.get('passwordRepeatReg');
  }
}
