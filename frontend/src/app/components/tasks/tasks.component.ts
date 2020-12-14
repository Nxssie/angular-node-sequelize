import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  task!: Task;
  tasks!: Task[];
  title!: string;
  description!: Text;
  done!: boolean;
  user!: User;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserAndTasks();
  }

  async ngAfterViewInit() {}

  getAll() {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getAllOfCurrentUser() {
    this.taskService.getTaskByUserId(this.user.id).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(id: number) {
    if (id == null) {
      console.warn("This task doesn't exists");
    } else {
      localStorage.setItem('ACTUAL_TASK', id.toString());
    }
  }

  deleteTask(id: any | number) {
    if (id == null) {
      console.log("This task doesn't exists");
    } else {
      this.taskService.deleteTask(id).subscribe(() => {
        this.getAllOfCurrentUser();
      });
    }
  }

  changeDone(id: any) {
    if (id == null) {
      console.log("This task doesn't exists");
    } else {
      this.taskService.getTaskById(id).subscribe((task) => {
        this.task = task;

        // Update status depending on the previous one
        if (task.done) {
          this.task.done = false;
        } else {
          this.task.done = true;
        }

        this.taskService.updateTask(this.task, id).subscribe((data) => {
          this.getAllOfCurrentUser();
        });
      });
    }
  }

  getUserAndTasks() {
    const userId = +localStorage.getItem("ACTUAL_USER_ID")!;
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
      if(user.isAdmin) {
        this.getAll();
      } else {
        this.getAllOfCurrentUser();
      }
    })
  }

}
