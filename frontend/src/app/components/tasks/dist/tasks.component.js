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
    function TasksComponent(taskService) {
        this.taskService = taskService;
        this.doneElement = false;
    }
    TasksComponent.prototype.ngOnInit = function () {
        this.getAll();
        console.log("init");
    };
    TasksComponent.prototype.ngAfterViewInit = function () {
        this.getAll();
        console.log("after");
    };
    TasksComponent.prototype.getAll = function () {
        var _this = this;
        this.taskService.getAll().subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.checkTasks = function () {
        for (var index = 0; index < this.tasks.length; index++) {
            if (this.tasks[index].done == "true") {
                this.doneElement = true;
            }
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
