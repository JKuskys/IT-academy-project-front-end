import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Info} from '../shared/registration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) {
  }


  submitRegistration(info: Info): Observable<Info> {
    return this.httpClient
      .post<Info>(`https://academy-project-back.herokuapp.com/api/applications`, info)
      .pipe(catchError(this.errorHandler));
  }


  errorHandler() {
    return throwError(
      'Sorry, our services does not work right now, please try that later'
    );
  }
}
