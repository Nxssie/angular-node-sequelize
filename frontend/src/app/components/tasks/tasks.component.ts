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

}
