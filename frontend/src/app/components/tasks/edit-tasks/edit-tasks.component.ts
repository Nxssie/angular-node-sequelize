import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.sass'],
})
export class EditTasksComponent implements OnInit {
  task!: Task;
  taskID: number = +localStorage.getItem("ACTUAL_TASK")!;

  editForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required]],
      done: [false]
    });
  }

  ngOnInit(): void {
    console.log("hello, world");
    if(this.taskID == null) {
      console.warn("Null task id");
      this.taskID = 1;
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

  onSubmit(taskData: any) {
    if(!this.editForm.valid) {
      console.warn('Please provide all the required values!');
      console.log(taskData);
    } else {
      let task = {
        id: null,
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        done: this.editForm.value.done,
        userId: 1
      }
      this.taskService.updateTask(task, this.task.id).subscribe((c) => {
        this.taskService.getAll();
        this.router.navigateByUrl("/mytasks");
      })
    }
  }
}
