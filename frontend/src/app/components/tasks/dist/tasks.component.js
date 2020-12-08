"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TasksComponent = void 0;
var core_1 = require("@angular/core");
var TasksComponent = /** @class */ (function () {
    function TasksComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
    }
    TasksComponent.prototype.ngOnInit = function () {
        this.getAll();
    };
    TasksComponent.prototype.ngAfterViewInit = function () {
    };
    TasksComponent.prototype.getAll = function () {
        var _this = this;
        console.log("get all");
        this.taskService.getAll().subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.editTask = function (id) {
        if (id == null) {
            console.warn("This task doesn't exists");
        }
        else {
            localStorage.setItem("ACTUAL_TASK", id.toString());
            console.log(localStorage.getItem("ACTUAL_TASK"));
        }
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        if (id == null) {
            console.log("This task doesn't exists");
        }
        else {
            this.taskService.deleteTask(id).subscribe(function () {
                _this.getAll();
            });
        }
    };
    TasksComponent.prototype.changeDone = function (id) {
        var _this = this;
        if (id == null) {
            console.log("This task doesn't exists");
        }
        else {
            this.taskService.getTaskById(id).subscribe(function (task) {
                console.log("Previous status: " + task.done);
                _this.task = task;
                // Update status depending on the previous one
                if (task.done) {
                    _this.task.done = false;
                    console.log("Next status: " + _this.task.done);
                }
                else {
                    _this.task.done = true;
                    console.log("Next status: " + _this.task.done);
                }
                _this.taskService.updateTask(_this.task, id).subscribe(function () {
                    console.log("Updating...->");
                    console.log(_this.task);
                    _this.getAll();
                });
            });
        }
    };
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'app-tasks',
            templateUrl: './tasks.component.html',
            styleUrls: ['./tasks.component.sass']
        })
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
