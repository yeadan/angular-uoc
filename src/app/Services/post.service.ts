import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  addPost(post: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/post', post);
  }
  deletePost(id: string): Observable<any> {
    return this.http.delete('http://localhost:8000/api/post/' + id);
  }
  editPost(post: any, id: number): Observable<any> {
    return this.http.put('http://localhost:8000/api/post/' + id, post);
  }
  getPost(id: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/post/' + id);
  }
  listPostPublic(): Observable<any> {
    return this.http.get('http://localhost:8000/api/post?public');
  }
  listPost(): Observable<any> {
    return this.http.get('http://localhost:8000/api/post');
  }
}
