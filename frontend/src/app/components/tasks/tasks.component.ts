import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model'
import { TaskService } from '../../services/task.service'

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  task!: Task;
  tasks!: Task[];
  title!: string;
  description!: Text;
  done!: boolean;


  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
    this.getCurrentUser();
  }

  ngAfterViewInit() {
  }

  getAll() {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  editTask(id: number) {
    if (id == null) {
      console.warn("This task doesn't exists");
    } else {
      localStorage.setItem("ACTUAL_TASK", id.toString());
      console.log(localStorage.getItem("ACTUAL_TASK"));
    }
  }

  deleteTask(id: any | number) {
    if (id == null) {
      console.log("This task doesn't exists");
    } else {
      this.taskService.deleteTask(id).subscribe(()=> {
        this.getAll();
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

        this.taskService.updateTask(this.task, id).subscribe((data)=> {
          this.getAll();
        })
      });
      
    }
  }

  getCurrentUser() {
    console.log(localStorage.getItem("ACTUAL_USER_ID"));
    console.log("Token:" + localStorage.getItem("ACCESS_TOKEN"));
  }

}
