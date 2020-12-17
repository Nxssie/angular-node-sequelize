import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.sass'],
})
export class EditTasksComponent implements OnInit {
  task!: Task;
  taskID: number = +localStorage.getItem("ACTUAL_TASK")!;
  user!: User;
  currentDate = new Date();

  editForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      done: [false],
      userId: ['']
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    if(this.taskID == null) {
      console.warn("Null task id");
    } else {
      this.getData(this.taskID);
    }
  }

  getData(id: number) {
    this.taskService.getTaskById(id).subscribe((task) => {
      this.task = task;
      this.editForm.patchValue({
        title: task.title,
        description: task.description,
        done: task.done
      })
    });
  }

  getTitleErrorMessage() {
    if(!this.editForm.value.title.required) {
      return "Title is required";
    }

    return "Form invalid";
    
  }

  getDescriptionErrorMessage() {
    if(!this.editForm.value.description.required) {
      return "Description is required";
    }

    return "Form invalid"
  }

  onSubmit(taskData: any) {
    if(!this.editForm.valid) {
      this.dialog.open(InvalidEditFormModal);
    } else {
      let task = {
        id: null,
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        done: this.editForm.value.done,
        userId: this.editForm.value.userId || this.user.id
      }
      this.taskService.updateTask(task, this.task.id).subscribe((c) => {
        this.router.navigateByUrl("/mytasks");
      })
    }
  }

  getCurrentUser() {
    let id =  <number><unknown>localStorage.getItem("ACTUAL_USER_ID");
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }
}

@Component({
  selector: 'invalid-task-form-model',
  templateUrl: 'invalid-task-form-model.html',
  styleUrls: ['./edit-tasks.component.sass']
})
export class InvalidEditFormModal {

  constructor(
    public dialogRef: MatDialogRef<InvalidEditFormModal>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}