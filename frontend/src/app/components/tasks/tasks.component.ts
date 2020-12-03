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
    console.log("init")
  }

  ngAfterViewInit() {
    console.log("after")
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
        console.log("Previous status: " + task.done);
        this.task = task;

        // Update status depending on the previous one
        if (task.done) {
          this.task.done = false;
          console.log("Next status: " + task.done);
        } else {
          this.task.done = true;
          console.log("Next status: " + task.done);
        }

        this.taskService.updateTask(this.task, id).subscribe(()=> {
          this.taskService.getAll();
          this.router.navigateByUrl("/mytasks");
        })
      });
      
    }
  }

}
