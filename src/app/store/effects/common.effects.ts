import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {take, tap} from 'rxjs/operators';
import {go, signIn, signInFail, signInSuccess} from '../actions';
import {PhoneNumberService} from '../../services/universal/phone-number.service';
import {USER_TYPES} from '../../shared/constants/account.const';
import {ROUTES} from '../../shared/constants/routes.const';
import {fetchPhoneNumbers, fetchPhoneNumbersFail, fetchPhoneNumbersSuccess} from '../actions/common.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {getPhoneNumberLoadingStatus} from '../selectors/common.selectors';

@Injectable()
export class CommonEffects {
  constructor(private actions$: Actions, private store: Store<{}>, private phoneNumberService: PhoneNumberService) {}

  public getPhoneNumbers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchPhoneNumbers),
        tap(() => {
          this.store.select(getPhoneNumberLoadingStatus).pipe(take(1)).subscribe((loadingStatus) => {
            if(!loadingStatus.loaded){
            this.phoneNumberService.getPhoneCodes().subscribe(
              (data) => {
                this.store.dispatch(fetchPhoneNumbersSuccess({payload: data as string[]}));
              },
              (error: HttpErrorResponse) => {
                this.store.dispatch(fetchPhoneNumbersFail({payload:{message: error.message}}));
            });
            }
          })
        })
      ),
    { dispatch: false }
  );
}
