import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {
  changePassword, changePasswordFail,
  changePasswordSuccess, resetUser,
  sendPasswordResetEmail, sendPasswordResetEmailFail, sendPasswordResetEmailSuccess,
  signIn,
  signInFail,
  signInSuccess,
  signUp,
  signUpFail,
  signUpSuccess
} from '../actions';
import {User} from '../../shared/types/account';
import {LoadingStatus} from '../../shared/types/other';

export interface State {
  signInLoadingStatus: LoadingStatus;
  signUpLoadingStatus: LoadingStatus;
  sendEmailLoadingStatus: LoadingStatus;
  passwordChangeLoadingStatus: LoadingStatus;
  user?: User;
}

export const initialState: State = {
  signInLoadingStatus: {
    loading: false,
    loaded: false,
  },
  signUpLoadingStatus: {
    loading: false,
    loaded: false,
  },
  sendEmailLoadingStatus: {
    loading: false,
    loaded: false,
  },
  passwordChangeLoadingStatus: {
    loading: false,
    loaded: false,
  },
};

const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(signIn, (state) => ({
    ...state,
    signInLoadingStatus: {
      loading: true,
      loaded: false,
    }
  })),
  on(signInSuccess, (state, { payload }) => ({
    ...state,
    signInLoadingStatus: {
      loading: false,
      loaded: true,
    },
    user: payload
  })),
  on(signInFail, (state, { payload }) => ({
    ...state,
    signInLoadingStatus: {
      loading: false,
      loaded: false,
      error: payload
    },
  })),
  on(signUp, (state) => ({
    ...state,
    signUpLoadingStatus: {
      loading: true,
      loaded: false,
    }
  })),
  on(signUpSuccess, (state ) => ({
    ...state,
    signUpLoadingStatus: {
      loading: false,
      loaded: true,
    },
  })),
  on(signUpFail, (state, { payload }) => ({
    ...state,
    signUpLoadingStatus: {
      loading: false,
      loaded: false,
      error: payload
    },
  })),
  on(sendPasswordResetEmail, (state) => ({
    ...state,
    sendEmailLoadingStatus: {
      loading: true,
      loaded: false,
    }
  })),
  on(sendPasswordResetEmailSuccess, (state ) => ({
    ...state,
    sendEmailLoadingStatus: {
      loading: false,
      loaded: true,
    },
  })),
  on(sendPasswordResetEmailFail, (state, { payload }) => ({
    ...state,
    sendEmailLoadingStatus: {
      loading: false,
      loaded: false,
      error: payload
    },
  })),
  on(changePassword, (state) => ({
    ...state,
    passwordChangeLoadingStatus: {
      loading: true,
      loaded: false,
    }
  })),
  on(changePasswordSuccess, (state ) => ({
    ...state,
    passwordChangeLoadingStatus: {
      loading: false,
      loaded: true,
    },
  })),
  on(changePasswordFail, (state, { payload }) => ({
    ...state,
    passwordChangeLoadingStatus: {
      loading: false,
      loaded: false,
      error: payload
    },
  })),
  on(resetUser, () => (initialState)),
);

export function userReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
