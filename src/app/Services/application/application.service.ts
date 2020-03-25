import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Info } from '../../shared/registration';
import {Application} from '../../shared/application';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${this.proxyurl}${this.url}${this.apiPath}/applications`);
  }
  getApplication({ id }): Observable<Application> {
    return this.httpClient.get<Application>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${id}`);
  }
  updateApplication({ id }, application: Application): Observable<any> {
    return this.httpClient.put<Application>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${id}`, application);
  }
}
