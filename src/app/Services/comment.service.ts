import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(post: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/comment', post);
  }
  deleteComment(id: string): Observable<any> {
    return this.http.delete('http://localhost:8000/api/comment/' + id);
  }
  updateComment(post: any, id: string): Observable<any> {
    return this.http.put('http://localhost:8000/api/comment/' + id, post);
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
