import {createAction, props} from '@ngrx/store';
import {EmailPayload, PasswordResetPayload, SignInPayload, SignUpPayload, User} from '../../shared/types/account';
import {GeneralError} from '../../shared/types/other';

export enum UserActions {
  CheckAuthentication = '[Auth] Check Authentication',
  SignIn = '[Auth] Sign in',
  SignInSuccess = '[Auth] Sign in success',
  SignInFail = '[Auth] Sign in fail',
  SignUp = '[Auth] Sign up',
  SignUpSuccess = '[Auth] Sign up success',
  SignUpFail = '[Auth] Sign up fail',
  SendPasswordResetEmail = '[Auth] Send password reset',
  SendPasswordResetEmailSuccess = '[Auth] Send password reset success',
  SendPasswordResetEmailFail = '[Auth] Send password reset fail',
  ChangePassword = '[Auth] Change password',
  ChangePasswordSuccess = '[Auth] Change password success',
  ChangePasswordFail = '[Auth] Change password fail',
  ResetUser = '[Auth] Reset user',
}

export const checkAuthentication = createAction(UserActions.CheckAuthentication);;


export const signIn = createAction(UserActions.SignIn, props<{ payload: SignInPayload }>());

export const signInSuccess = createAction(UserActions.SignInSuccess, props<{ payload: User }>());

export const signInFail = createAction(UserActions.SignInFail, props<{ payload: GeneralError }>());


export const signUp = createAction(UserActions.SignUp, props<{ payload: SignUpPayload }>());

export const signUpSuccess = createAction(UserActions.SignUpSuccess);

export const signUpFail = createAction(UserActions.SignUpFail, props<{ payload: GeneralError }>());


export const sendPasswordResetEmail = createAction(UserActions.SendPasswordResetEmail, props<{ payload: EmailPayload }>());

export const sendPasswordResetEmailSuccess = createAction(UserActions.SendPasswordResetEmailSuccess);

export const sendPasswordResetEmailFail = createAction(UserActions.SendPasswordResetEmailFail, props<{ payload: GeneralError }>());


export const changePassword = createAction(UserActions.ChangePassword, props<{ payload: PasswordResetPayload }>());

export const changePasswordSuccess = createAction(UserActions.ChangePasswordSuccess);

export const changePasswordFail = createAction(UserActions.ChangePasswordFail, props<{ payload: GeneralError }>());


export const resetUser = createAction(UserActions.ResetUser);

