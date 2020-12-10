import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { User } from "../../models/user.model";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded" }),

};
const apiUrl = "http://localhost:4000/api/users";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(apiUrl + "/" + id);
  }
}
