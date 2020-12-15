import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { User } from "../../models/user.model";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': <string>localStorage.getItem("ACCESS_TOKEN")
  }),
};
const apiUrl = "http://localhost:4000/api/users";
import { AuthResponse } from  '../../components/user/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authSubject  =  new  BehaviorSubject(false);

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${apiUrl}/${id}`);
  }

  update(user: User, id: number): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${apiUrl}/${id}`, user, httpOptions).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await localStorage.setItem("ACCESS_TOKEN", res.access_token);
          await localStorage.setItem("ACTUAL_USER_ID", res.user.id.toFixed());
          this.authSubject.next(true);
        }
      })

    );
  }

}
