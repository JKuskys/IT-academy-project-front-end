import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Registration} from '../../shared/registration';
import {LoginInfo} from '../../shared/login';
import {User} from "../../shared/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  constructor(private httpClient: HttpClient) {
  }


  submitRegistration(info: Registration): Observable<Registration> {
    return this.httpClient
      .post<Registration>((this.proxyurl + this.url + `api/applications`), info)
      .pipe(catchError(this.errorHandler));
  }

  submitLogin(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.httpClient
      .post <LoginInfo>((this.proxyurl + this.url + `auth/login`), loginInfo)
      .pipe(catchError(this.errorHandler));
  }

  sendEmail(email: string): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('email', email);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient
      .post <LoginInfo>(this.proxyurl + this.url + `api/user/resetPassword`, formData, {headers})
      .pipe(catchError(this.errorHandler));
  }

  changePassword(info: User): Observable<any>{
    return this.httpClient
      .post <User>(this.proxyurl + this.url + `api/user/savePassword`, info)
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
