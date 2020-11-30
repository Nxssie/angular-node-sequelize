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

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  // login(user: User): Observable<AuthResponse> {
  //   return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
  //     tap(async (res: AuthResponse) => {

  //       if (res.user) {
  //         await this.storage.set("ACCESS_TOKEN", res.user.access_token);
  //         await this.storage.set("EXPIRES_IN", res.user.expires_in);
  //         this.authSubject.next(true);
  //       }
  //     })
  //   );
  // }

}
