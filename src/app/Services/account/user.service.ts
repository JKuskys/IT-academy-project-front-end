import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Info} from '../../shared/registration';
import {LoginInfo} from '../../shared/login';

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
    return throwError(error.error.message);
  }
}
