import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';

import {State as UserState} from './user.reducer';
import {commonReducer, State as CommonState} from './common.reducer';

export interface State {
  user: UserState;
  common: CommonState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  common: commonReducer,
};
