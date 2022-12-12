import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(like: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/like', like);
  }
  deleteLike(id: number): Observable<any> {
    return this.http.delete('http://localhost:8000/api/like/' + id);
  }
  postLikes(id: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/likes/' + id);
  }
}
