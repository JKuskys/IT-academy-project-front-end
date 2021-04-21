import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EmailPayload, PasswordResetPayload, SignInPayload, SignUpPayload} from '../../shared/types/account';
import {API_PATHS} from '../../shared/constants/other.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  submitRegistration(payload: SignUpPayload): Observable<any> {
    return this.httpClient
      .post<SignUpPayload>((API_PATHS.proxy + API_PATHS.backEnd + API_PATHS.applications), payload)
      .pipe(catchError(this.errorHandler));
  }

  submitLogin(payload: SignInPayload): Observable<any> {
    return this.httpClient
      .post <SignInPayload>((API_PATHS.proxy + API_PATHS.backEnd + API_PATHS.login), payload)
      .pipe(catchError(this.errorHandler));
  }

  sendEmail(payload: EmailPayload): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('email', payload.email);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient
      .post <SignInPayload>(API_PATHS.proxy + API_PATHS.backEnd + API_PATHS.resetPassword, formData, {headers})
      .pipe(catchError(this.errorHandler));
  }

  changePassword(info: PasswordResetPayload): Observable<any> {
    return this.httpClient
      .post <any>(API_PATHS.proxy + API_PATHS.backEnd + API_PATHS.changePassword, info)
      .pipe(catchError(this.errorHandlerForTxt));
  }

  private errorHandlerForTxt(error: HttpErrorResponse) {
    return throwError(error.status);
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
