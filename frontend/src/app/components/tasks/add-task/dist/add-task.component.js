"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddTaskComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddTaskComponent = /** @class */ (function () {
    function AddTaskComponent(fb, router, taskService) {
        this.fb = fb;
        this.router = router;
        this.taskService = taskService;
        this.description = '';
        this.currentDate = new Date();
        this.currentUser = "User";
        this.addForm = this.fb.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            description: ['', [forms_1.Validators.required]],
            userId: ['', [forms_1.Validators.required]],
            done: [false]
        });
    }
    AddTaskComponent.prototype.ngOnInit = function () { };
    AddTaskComponent.prototype.onSubmit = function (taskData) {
        var _this = this;
        if (!this.addForm.valid) {
            console.warn('Please provide all the required values!');
            console.log(taskData);
        }
        else {
            var task = {
                title: this.addForm.value.title,
                description: this.addForm.value.description,
                done: this.addForm.value.done,
                userId: this.addForm.value.userId
            };
            this.taskService.addTask(task).subscribe(function (c) {
                _this.taskService.getAll();
                _this.router.navigateByUrl("/mytasks");
            });
        }
    };
    AddTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-add-task',
            templateUrl: './add-task.component.html',
            styleUrls: ['./add-task.component.sass']
        })
    ], AddTaskComponent);
    return AddTaskComponent;
}());
exports.AddTaskComponent = AddTaskComponent;
