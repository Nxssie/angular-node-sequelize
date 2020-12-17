"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvalidEditFormModal = exports.EditTasksComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditTasksComponent = /** @class */ (function () {
    function EditTasksComponent(taskService, userService, dialog, router, fb) {
        this.taskService = taskService;
        this.userService = userService;
        this.dialog = dialog;
        this.router = router;
        this.fb = fb;
        this.taskID = +localStorage.getItem("ACTUAL_TASK");
        this.currentDate = new Date();
        this.editForm = this.fb.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            description: ['', [forms_1.Validators.required]],
            done: [false],
            userId: ['']
        });
    }
    EditTasksComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
        if (this.taskID == null) {
            console.warn("Null task id");
        }
        else {
            this.getData(this.taskID);
        }
    };
    EditTasksComponent.prototype.getData = function (id) {
        var _this = this;
        this.taskService.getTaskById(id).subscribe(function (task) {
            _this.task = task;
            _this.editForm.patchValue({
                title: task.title,
                description: task.description,
                done: task.done
            });
        });
    };
    EditTasksComponent.prototype.getTitleErrorMessage = function () {
        if (!this.editForm.value.title.required) {
            return "Title is required";
        }
        return "Form invalid";
    };
    EditTasksComponent.prototype.getDescriptionErrorMessage = function () {
        if (!this.editForm.value.description.required) {
            return "Description is required";
        }
        return "Form invalid";
    };
    EditTasksComponent.prototype.onSubmit = function (taskData) {
        var _this = this;
        if (!this.editForm.valid) {
            this.dialog.open(InvalidEditFormModal);
        }
        else {
            var task = {
                id: null,
                title: this.editForm.value.title,
                description: this.editForm.value.description,
                done: this.editForm.value.done,
                userId: this.editForm.value.userId || this.user.id
            };
            this.taskService.updateTask(task, this.task.id).subscribe(function (c) {
                _this.router.navigateByUrl("/mytasks");
            });
        }
    };
    EditTasksComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var id = localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(id).subscribe(function (user) {
            _this.user = user;
        });
    };
    EditTasksComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-tasks',
            templateUrl: './edit-tasks.component.html',
            styleUrls: ['./edit-tasks.component.sass']
        })
    ], EditTasksComponent);
    return EditTasksComponent;
}());
exports.EditTasksComponent = EditTasksComponent;
var InvalidEditFormModal = /** @class */ (function () {
    function InvalidEditFormModal(dialogRef) {
        this.dialogRef = dialogRef;
    }
    InvalidEditFormModal.prototype.onClose = function () {
        this.dialogRef.close();
    };
    InvalidEditFormModal = __decorate([
        core_1.Component({
            selector: 'invalid-task-form-model',
            templateUrl: 'invalid-task-form-model.html',
            styleUrls: ['./edit-tasks.component.sass']
        })
    ], InvalidEditFormModal);
    return InvalidEditFormModal;
}());
exports.InvalidEditFormModal = InvalidEditFormModal;
