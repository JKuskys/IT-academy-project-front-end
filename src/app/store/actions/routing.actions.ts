import { createAction, props } from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export enum RoutingActions {
  Go = '[Routing] Go',
}

export const go = createAction(RoutingActions.Go, props<{ path: string, extras?: NavigationExtras | undefined }>());
