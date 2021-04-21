import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {fetchPhoneNumbers} from '../../store';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getPhoneNumberLoadingStatus} from '../../store/selectors/common.selectors';
import {mapTo, take, tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class PhoneNumberGuard implements CanActivate {
  constructor(public store: Store<{}>) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getPhoneNumberLoadingStatus),
      tap((loadingStatus) => {
        if(!loadingStatus.loading && !loadingStatus.loaded) {
          console.log(loadingStatus.loading)
          console.log(loadingStatus.loaded)
          this.store.dispatch(fetchPhoneNumbers());
        }
      }),
      mapTo(true),
      take(1),
      );
  }
}
