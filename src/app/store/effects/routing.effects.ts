import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { go } from '../actions';

@Injectable()
export class RoutingEffects {
  constructor(private actions$: Actions, private router: Router) {}

  public goToSpecificRouteWithExtras$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(go),
        tap(({ path, extras }) => {
          this.router.navigate([path], extras).catch();
        })
      ),
    { dispatch: false }
  );
}
