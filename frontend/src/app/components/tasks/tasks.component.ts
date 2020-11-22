import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model'
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks!: Task[];
  doneElement = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAll();
    console.log("init")
  }

  ngAfterViewInit() {
    this.getAll();
    console.log("after")
  }

  getAll() {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  checkTasks(){
    for (let index = 0; index < this.tasks.length; index++) {
      if(this.tasks[index].done == "true") {
        this.doneElement = true;
      }
      
    }
  }

}
