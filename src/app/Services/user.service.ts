import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', user);
  }
  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/register', user);
  }
  actualUser(): Observable<any> {
    return this.http.get('http://localhost:8000/api/user');
  }
  //Utilizaremos cookies para almacenar el token JWT
  setToken(token: string) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
}
