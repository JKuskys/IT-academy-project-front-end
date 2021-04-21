import { createFeatureSelector, createSelector } from '@ngrx/store';
import {STORE_SLICES} from '../../shared/constants/other.const';
import {State} from '../reducers/common.reducer';

export const getCommonState = createFeatureSelector<State>(STORE_SLICES.common);

export const getPhoneNumbers = createSelector(getCommonState, (state) => state.phoneNumbers);

export const getPhoneNumberLoadingStatus = createSelector(getCommonState, (state) => state.loadingStatus);
