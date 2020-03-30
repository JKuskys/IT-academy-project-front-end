import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = 'https://academy-project-back.herokuapp.com/';
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private readonly apiPath = '/api';

  constructor(private httpClient: HttpClient) { }

  getComments({ applicationId }): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments`);
  }
  getComment({ id, applicationId }): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments/${id}`);
  }

  getStudentComments({ applicationId }): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments/applicant/visible`);
  }
  addComment(comment: Comment, { applicationId }): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments`, comment);
  }
  updateComment(comment: Comment, { applicationId }): Observable<Comment> {
    return this.httpClient
      .put<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments/${comment.id}`, comment);
  }
  deleteComment({ applicationId, commentId }): Observable<Comment> {
    return this.httpClient
      .delete<Comment>(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments/${commentId}`);
  }
}
