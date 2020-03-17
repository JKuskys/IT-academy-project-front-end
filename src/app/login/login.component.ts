import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Info} from '../shared/login';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    emailLogin: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
    ]],
    passwordLogin: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]],

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

  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.info = {
      emailReg: this.emailReg.value,
      passwordReg: this.passwordReg.value,
    };
}

  get emailReg(){
    return this.loginForm.get('emailReg');
  }
  get passwordReg() {
    return this.loginForm.get('passwordReg');
  }


}
