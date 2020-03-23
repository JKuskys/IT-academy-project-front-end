import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../shared/login';
import {UserService} from '../Services/user.service';
import {ModalService} from '../Services/modal/modal.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
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
    this.loginInfo = {
      email: this.loginForm.get('emailLogin').value,
      password: this.loginForm.get('passwordLogin').value,
    };
    this.userService.submitLogin(this.loginInfo).subscribe(
      () => {
        this.serverErrorMessage = '';
        this.closeModal('login');
      },
      error => (this.serverErrorMessage = error)
    );
  }
  

 closeDialog(id: string){

   this.dialog.close(id)
      
 }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.loginForm.reset();
    this.loginForm = this.setForm();
  }

  setForm() {
    return this.fb.group({
      emailLogin: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-z]{2,4}$'),
      ]],
      passwordLogin: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],

    });
  }
}
