import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../shared/login';
import {UserService} from '../Services/account/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RoleGuardService} from '../Services/authorization/role-guard-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
    
    constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private roleGuardService: RoleGuardService,
    private dialog: MatDialogRef<any>) {
    this.loginForm = this.setForm();
  }

  loginInfo: LoginInfo;
  serverErrorMessage: string;
  passwordNotMatch: boolean;
  submission: boolean;


  ngOnInit(): void {
    this.serverErrorMessage = '';
  }

  onSubmit() {
    this.passwordNotMatch = false;
    this.submission = false;
    this.isLoading = true;
    this.loginInfo = {
      email: this.loginForm.get('emailLogin').value,
      password: this.loginForm.get('passwordLogin').value,

    };
    this.userService.submitLogin(this.loginInfo).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.roleGuardService.setRole(response.token);
        this.serverErrorMessage = '';
        this.closeDialog('login');
        if (localStorage.getItem('roles').includes('ADMIN')){
          this.router.navigate(['applications']);
        }
        if (localStorage.getItem('roles').includes('USER')){
          this.router.navigate(['profile']);
        }
          },

      error => {
        if (error === 'Access Denied') {
          this.serverErrorMessage = 'Neteisingas el. paštas arba slaptažodis';
        } else {
          this.serverErrorMessage = error;
        }
        this.isLoading = false;
      }
    );
  }

  closeDialog(id: string) {
    this.dialog.close(id);
  }


  setForm() {
    return this.fb.group({
      emailLogin: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      passwordLogin: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],

    });
  }
}
