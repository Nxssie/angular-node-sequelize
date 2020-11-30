import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  description: string = '';

  addForm: FormGroup;

  currentDate = new Date();

  currentUser = "User";

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private taskService: TaskService
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      done: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(taskData: any) {
    if(!this.addForm.valid) {
      console.warn('Please provide all the required values!');
      console.log(taskData);
    } else {
      let task = {
        title: this.addForm.value.title,
        description: this.addForm.value.description,
        done: this.addForm.value.done,
        userId: this.addForm.value.userId
      }
      this.taskService.addTask(task).subscribe((c) => {
        this.taskService.getAll();
        this.router.navigateByUrl("/mytasks");
      })
    }
  }
}
