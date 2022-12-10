import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(comment: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/comment', comment);
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete('http://localhost:8000/api/comment/' + id);
  }
  updateComment(comment: any, id: number): Observable<any> {
    return this.http.put('http://localhost:8000/api/comment/' + id, comment);
  }
  getComment(id: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/comment/' + id);
  }
  postComments(id: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/comments/' + id);
  }
  listComments(): Observable<any> {
    return this.http.get('http://localhost:8000/api/comment');
  }
}
