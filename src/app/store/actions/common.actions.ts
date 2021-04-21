import { createAction, props } from '@ngrx/store';
import {GeneralError} from '../../shared/types/other';

export enum CommonActions {
  FetchPhoneNumbers = '[Common] Fetch phoneNumbers',
  FetchPhoneNumbersSuccess = '[Common] Fetch phoneNumbers',
  FetchPhoneNumbersFail = '[Common] Fetch phoneNumbers',
}

export const fetchPhoneNumbers = createAction(CommonActions.FetchPhoneNumbers);

export const fetchPhoneNumbersSuccess = createAction(CommonActions.FetchPhoneNumbersSuccess, props<{ payload: string[] }>());

export const fetchPhoneNumbersFail = createAction(CommonActions.FetchPhoneNumbersFail, props<{ payload: GeneralError }>());
