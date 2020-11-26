import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass'],
})
export class AddTaskComponent implements OnInit {
  description: string = '';

  addForm: FormGroup;
  currentUserId: number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  changeDescription(): void {
    this.description;
  }
}
