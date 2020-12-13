import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  description!: string;

  addForm: FormGroup;

  currentDate = new Date();

  currentUser!: User;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      done: [false]
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  // putUsernameCorrectly() {
  //   document.getElementById("username-field")!.innerHTML = `${this.currentUser.id};`
  // }

  getCurrentUser() {
    let id =  <number><unknown>localStorage.getItem("ACTUAL_USER_ID");
    this.userService.getUserById(id).subscribe((user) => {
      this.currentUser = user;
    });
  }

  onSubmit(taskData: any) {
    this.getCurrentUser();
    if(!this.addForm.valid) {
      console.warn('Please provide all the required values!');
      console.log(taskData);
    } else {
      let task = {
        id: null,
        title: this.addForm.value.title,
        description: this.addForm.value.description,
        done: this.addForm.value.done,
        userId: this.currentUser.id
      }
      this.taskService.addTask(task).subscribe((c) => {
        this.snackBar.open("Task added successfully", "Okay", {
          duration: 2000,
        });
        //this.router.navigateByUrl("/mytasks");
      })
    }
  }

  onCancel() {
    this.router.navigateByUrl("/mytasks");
  }
}
