import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Info } from '../shared/registration';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) { }

  getApplications(): Observable<Info[]> {
    return this.httpClient.get<Info[]>(`${this.proxyurl}${this.url}${this.apiPath}/applications`);
  }
  getApplication({ id }): Observable<Info> {
    return this.httpClient.get<Info>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${id}`);
  }
}
