import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
const apiUrl = 'http://localhost:4000/api/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<Task[]> {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3QxMyIsImlzQWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6IiQyYSQxMCRvVmR3bk5aZ1pzRVY3RGNzTGVEdUNlWWplNm10VUpMVkw4WU1HRmNNLkJTS202Y2dtZXR3aSIsImlhdCI6MTYwNzcxNjkxOSwiZXhwIjoxNjA3ODAzMzE5fQ.WhHi4LqqZjanKagOFMlp2cvZjwXbWqOuy60K6Fw4VYU'
    );
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const headersOptions = new Headers({
      headers: myHeaders
    })


    return this.http.get<Task[]>(apiUrl, myHeaders.toString());
  }

  getTaskByUserId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl + '/user/' + id, httpOptions);
  }

  addTask(task: Task): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append('title', task.title);
    bodyEncoded.append('description', task.description);
    bodyEncoded.append('done', task.done ? 'true' : 'false');
    bodyEncoded.append('userId', task.userId.toString());
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl + '/', body, httpOptions);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(apiUrl + '/' + id);
  }

  updateTask(task: Task, id: number): Observable<any> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append('title', task.title);
    bodyEncoded.append('description', task.description);
    bodyEncoded.append('done', task.done ? 'true' : 'false');
    let body = bodyEncoded.toString();

    return this.http.put(apiUrl + '/' + id, body, httpOptions);
  }

  deleteTask(id: number): Observable<any> {
    console.log(apiUrl + '/' + id);
    return this.http.delete(apiUrl + '/' + id);
  }
}
