import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
    private userService: UserService
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
    console.log(id);
    this.userService.getUserById(id).subscribe((user) => {
      console.log(user);
      this.currentUser = user;
    });
    console.log(this.currentUser);
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
        this.taskService.getAll();
        console.log(task.done);
        this.router.navigateByUrl("/mytasks");
      })
    }
  }

  onCancel() {
    this.router.navigateByUrl("/mytasks");
  }
}
