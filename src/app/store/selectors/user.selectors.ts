import { createFeatureSelector, createSelector } from '@ngrx/store';
import {STORE_SLICES} from '../../shared/constants/other.const';
import {State} from '../reducers/user.reducer';

export const getUserState = createFeatureSelector<State>(STORE_SLICES.user);

export const getSignInLoadingStatus = createSelector(getUserState, (state) => state.signInLoadingStatus);

export const getSignInError = createSelector(getSignInLoadingStatus, (loadingStatus) => loadingStatus.error?.message);

export const getIsSignInLoading = createSelector(getSignInLoadingStatus, (loadingStatus) => loadingStatus.loading);

export const getIsSignInLoaded = createSelector(getSignInLoadingStatus, (loadingStatus) => loadingStatus.loaded);

export const getSignUpLoadingStatus = createSelector(getUserState, (state) => state.signUpLoadingStatus);

export const getSignUpError = createSelector(getSignUpLoadingStatus, (loadingStatus) => loadingStatus.error?.message);

export const getIsSignUpLoading = createSelector(getSignUpLoadingStatus, (loadingStatus) => loadingStatus.loading);

export const getIsSignUpLoaded = createSelector(getSignUpLoadingStatus, (loadingStatus) => loadingStatus.loaded);

export const getPasswordChangeLoadingStatus = createSelector(getUserState, (state) => state.passwordChangeLoadingStatus);

export const getPasswordChangeError = createSelector(getPasswordChangeLoadingStatus, (loadingStatus) => loadingStatus.error?.message);

export const getIsPasswordChangeLoading = createSelector(getPasswordChangeLoadingStatus, (loadingStatus) => loadingStatus.loading);

export const getIsPasswordChangeLoaded = createSelector(getPasswordChangeLoadingStatus, (loadingStatus) => loadingStatus.loaded);

export const getSendEmailLoadingStatus = createSelector(getUserState, (state) => state.sendEmailLoadingStatus);

export const getSendEmailError = createSelector(getSendEmailLoadingStatus, (loadingStatus) => loadingStatus.error?.message);

export const getIsSendEmailLoading = createSelector(getSendEmailLoadingStatus, (loadingStatus) => loadingStatus.loading);

export const getIsSendEmailLoaded = createSelector(getSendEmailLoadingStatus, (loadingStatus) => loadingStatus.loaded);

export const getUser = createSelector(getUserState, (state) => state.user);
