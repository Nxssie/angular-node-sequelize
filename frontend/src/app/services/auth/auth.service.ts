import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { User } from  '../../components/user/auth/user';
import { AuthResponse } from  '../../components/user/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
          await localStorage.setItem("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users/signin`, user).pipe(
      tap(async (res: AuthResponse ) => {

        if (res.user) {
          await localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
          await localStorage.setItem("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await localStorage.remove("ACCESS_TOKEN");
    await localStorage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

}
