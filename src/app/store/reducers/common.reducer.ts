import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {
} from '../actions';
import {LoadingStatus} from '../../shared/types/other';
import {fetchPhoneNumbers, fetchPhoneNumbersFail, fetchPhoneNumbersSuccess} from '../actions/common.actions';

export interface State {
  loadingStatus: LoadingStatus;
  phoneNumbers?: string[];
}

export const initialState: State = {
  loadingStatus: {
    loading: false,
    loaded: false,
  },
};

const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(fetchPhoneNumbers, (state) => ({
    ...state,
    signInLoadingStatus: {
      loading: true,
      loaded: false,
    }
  })),
  on(fetchPhoneNumbersSuccess, (state, { payload }) => ({
    ...state,
    signInLoadingStatus: {
      loading: false,
      loaded: true,
    },
    phoneNumbers: payload
  })),
  on(fetchPhoneNumbersFail, (state, { payload }) => ({
    ...state,
    signInLoadingStatus: {
      loading: false,
      loaded: true,
      error: payload
    },
  })),
);

export function commonReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
