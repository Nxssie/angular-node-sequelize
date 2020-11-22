import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Task } from "../models/task.model";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded" }),

};
const apiUrl = "http://localhost:4000/api/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl);
  }

  getCarsByUserId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl + "/tasks/" + id);
  }

}
