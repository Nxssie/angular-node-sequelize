import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserAndTasks();
  }

  ngAfterViewInit() {
    this.getUserAndTasks();
  }

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
      localStorage.setItem('ACTUAL_TASK', id.toString());
      this.dialog.open(ConfirmDeleteTaskDialog);

      this.dialog.afterAllClosed.subscribe(() => {
        this.getAllOfCurrentUser();
      })
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

@Component({
  selector: 'confirm-delete-task.dialog',
  templateUrl: 'confirm-delete-task.dialog.html',
  styleUrls: ['./tasks.component.sass']
})
export class ConfirmDeleteTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteTaskDialog>,
    private taskService: TaskService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    let id = +localStorage.getItem("ACTUAL_TASK")!;
    this.taskService.deleteTask(id).subscribe(() => {
      this.dialogRef.close();
    });
  }

}