import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {ROUTES} from '../../shared/constants/routes.const';
import {UserService} from '../../services/account/user.service';
import {
  changePassword, changePasswordFail, changePasswordSuccess, go,
  sendPasswordResetEmail,
  sendPasswordResetEmailFail, sendPasswordResetEmailSuccess,
  signIn,
  signInFail,
  signInSuccess,
  signUp,
  signUpFail,
  signUpSuccess
} from '../actions';
import {USER_TYPES} from '../../shared/constants/account.const';
import {EmailSentComponent} from '../../body/email-sent/email-sent.component';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangedComponent} from '../../body/password-changed/password-changed.component';
import {SuccessfulRegistrationComponent} from '../../body/successful-registration/successful-registration.component';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  public signInUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signIn),
        tap(( { payload } ) => {
          this.userService.submitLogin(payload).subscribe(
            (response) => {
                this.store.dispatch(signInSuccess({payload: response}))
                if (response.token === USER_TYPES.admin) {
                  this.store.dispatch(go({path: ROUTES.applications}))
                }
                if (response.token === USER_TYPES.user) {
                  this.store.dispatch(go({path: ROUTES.application}))
                }
              },

            (error) => {
                if (error === 'Access Denied') {
                  this.store.dispatch(signInFail({payload: {message: 'Neteisingas el. paštas arba slaptažodis'}}))
                } else {
                  this.store.dispatch(signInFail({payload: {message: error}}))
                }
              }
          );
        })
      ),
    {dispatch: false}
  );

  public signUpUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUp),
        tap(({ payload }) => {
          this.userService.submitRegistration(payload).subscribe(
            () => {
              this.store.dispatch(signUpSuccess());
              this.dialog.open(SuccessfulRegistrationComponent);
            },
            (error: string) => {
              this.store.dispatch(signUpFail({payload: { message: error}}));
            }
          );
        })
      ),
    {dispatch: false}
  );

  public sendPasswordResetToEmail = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendPasswordResetEmail),
        tap(({ payload }) => {
          this.userService.sendEmail(payload).subscribe(
            () => {},
            (error: string) => {
              if (error === 'Access Denied') {
                this.store.dispatch(sendPasswordResetEmailFail({payload: {message: 'Neteisingas el. paštas'}}));
              } else {
                this.dialog.open(EmailSentComponent);
                this.store.dispatch(sendPasswordResetEmailSuccess());
              }
            }
          );
        })
      ),
    {dispatch: false}
  )

  public changeUserPassword = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changePassword),
        tap(({ payload }) => {
          this.userService.changePassword(payload).subscribe(
            () => {},
            (error: string) => {
              if (error.toString() === '200') {
                this.dialog.open(PasswordChangedComponent,{ disableClose: true });
                this.store.dispatch(changePasswordSuccess());
              } else {
                this.store.dispatch(changePasswordFail({payload: { message: 'Atsiprašome, bet bandykite veliau dar kartą' }}));
              }
            }
          );
        })
      ),
    {dispatch: false}
  )
}
