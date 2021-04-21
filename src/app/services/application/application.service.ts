import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Application} from '../../shared/types/application';
import {catchError} from 'rxjs/operators';
import {EmailPayload} from '../../shared/types/account';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) {
  }

  getApplications(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${this.proxyurl}${this.url}${this.apiPath}/applications`);
  }

  getApplication({id}): Observable<Application> {
    return this.httpClient.get<Application>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${id}`);
  }

  updateApplication({id}, application: Application): Observable<any> {
    return this.httpClient.put<Application>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${id}`, application);
  }

  getProfileApplication(email: EmailPayload): Observable<any> {
    return this.httpClient
      .post <EmailPayload>((`${this.proxyurl}${this.url}${this.apiPath}/users/application`), email)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
