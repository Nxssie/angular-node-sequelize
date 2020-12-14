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

  private getOptions(user: User){
    let base64UserAndPassword = window.btoa(user.username + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization' : basicAccess,
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user, this.getOptions(user)).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await localStorage.setItem("ACCESS_TOKEN", res.access_token);
          await localStorage.setItem("ACTUAL_USER_ID", res.user.id.toFixed());
          this.authSubject.next(true);
        }
      })

    );
  }

  

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users/signin`, null, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse ) => {

        if (res.user) {
          await localStorage.setItem("ACCESS_TOKEN", res.access_token);
          await localStorage.setItem("ACTUAL_USER_ID", res.user.id.toFixed());
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await localStorage.removeItem("ACCESS_TOKEN");
    await localStorage.removeItem("ACTUAL_USER_ID");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token){ //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }

}
