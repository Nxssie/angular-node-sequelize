"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmDeleteTaskDialog = exports.TasksComponent = void 0;
var core_1 = require("@angular/core");
var TasksComponent = /** @class */ (function () {
    function TasksComponent(taskService, router, dialog, userService) {
        this.taskService = taskService;
        this.router = router;
        this.dialog = dialog;
        this.userService = userService;
    }
    TasksComponent.prototype.ngOnInit = function () {
        this.getUserAndTasks();
    };
    TasksComponent.prototype.ngAfterViewInit = function () {
        this.getUserAndTasks();
    };
    TasksComponent.prototype.getAll = function () {
        var _this = this;
        this.taskService.getAll().subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.getAllOfCurrentUser = function () {
        var _this = this;
        this.taskService.getTaskByUserId(this.user.id).subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.editTask = function (id) {
        if (id == null) {
            console.warn("This task doesn't exists");
        }
        else {
            localStorage.setItem('ACTUAL_TASK', id.toString());
        }
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        if (id == null) {
            console.log("This task doesn't exists");
        }
        else {
            localStorage.setItem('ACTUAL_TASK', id.toString());
            this.dialog.open(ConfirmDeleteTaskDialog);
            this.dialog.afterAllClosed.subscribe(function () {
                _this.getAllOfCurrentUser();
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
                _this.task = task;
                // Update status depending on the previous one
                if (task.done) {
                    _this.task.done = false;
                }
                else {
                    _this.task.done = true;
                }
                _this.taskService.updateTask(_this.task, id).subscribe(function (data) {
                    _this.getAllOfCurrentUser();
                });
            });
        }
    };
    TasksComponent.prototype.getUserAndTasks = function () {
        var _this = this;
        var userId = +localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(userId).subscribe(function (user) {
            _this.user = user;
            if (user.isAdmin) {
                _this.getAll();
            }
            else {
                _this.getAllOfCurrentUser();
            }
        });
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
var ConfirmDeleteTaskDialog = /** @class */ (function () {
    function ConfirmDeleteTaskDialog(dialogRef, taskService) {
        this.dialogRef = dialogRef;
        this.taskService = taskService;
    }
    ConfirmDeleteTaskDialog.prototype.onClose = function () {
        this.dialogRef.close();
    };
    ConfirmDeleteTaskDialog.prototype.onConfirm = function () {
        var _this = this;
        var id = +localStorage.getItem("ACTUAL_TASK");
        this.taskService.deleteTask(id).subscribe(function () {
            _this.dialogRef.close();
        });
    };
    ConfirmDeleteTaskDialog = __decorate([
        core_1.Component({
            selector: 'confirm-delete-task.dialog',
            templateUrl: 'confirm-delete-task.dialog.html',
            styleUrls: ['./tasks.component.sass']
        })
    ], ConfirmDeleteTaskDialog);
    return ConfirmDeleteTaskDialog;
}());
exports.ConfirmDeleteTaskDialog = ConfirmDeleteTaskDialog;
