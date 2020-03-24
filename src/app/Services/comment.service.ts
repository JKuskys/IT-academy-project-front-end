import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.proxyurl}${this.url}${this.apiPath}/comments`);
  }
  getComment({ id }): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/comments/${id}`);
  }
  addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/comments`, comment);
  }
}
