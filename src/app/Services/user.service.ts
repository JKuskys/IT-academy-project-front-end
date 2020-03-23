import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Info} from '../shared/registration';
import {LoginInfo} from '../shared/login';
import {JwtHelper} from './JwtHelper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';


  constructor(private httpClient: HttpClient) {

  }


  submitRegistration(info: Info): Observable<Info> {

    return this.httpClient
      .post<Info>((this.proxyurl + this.url + `api/applications`), info)
      .pipe(catchError(this.errorHandler));
  }

  submitLogin(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.httpClient
      .post <LoginInfo>((this.proxyurl + this.url + `auth/login`), loginInfo)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  }
}
