import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {SignInPayload} from '../../shared/types/account';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {getIsSignInLoaded, getIsSignInLoading, getSignInError, signIn} from '../../store';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;
  public errorMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>) {
    this.loginForm = this.setForm();
  }

  public openPasswordReminder(): void {
    this.closeDialog();
    this.dialog.open(ForgotPasswordComponent);
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsSignInLoading);
    this.errorMessage$ = this.store.select(getSignInError);
    this.store.select(getIsSignInLoaded).subscribe((loaded)=>{
      if(loaded){
        this.closeDialog()
      }
    })
  }

  public onSubmit() {
    this.store.dispatch(signIn({payload: this.loginForm.getRawValue()}))
  }

  public closeDialog() {
    this.dialogRef.close('login');
  }


  private setForm() {
    return this.fb.group({
      email: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-z]{2,4}$'),
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],

    });
  }
}
