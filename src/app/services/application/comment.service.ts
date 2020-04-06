import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  addAttachment({ applicationId, commentId, file }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient
      .post(`${this.proxyurl}${this.url}${this.apiPath}/applications/${applicationId}/comments/${commentId}/attachment`,
      formData, { headers });
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
