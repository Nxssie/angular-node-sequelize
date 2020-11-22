"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
    })
};
var apiUrl = "http://localhost:4000/api/tasks";
var TaskService = /** @class */ (function () {
    function TaskService(http, router) {
        this.http = http;
        this.router = router;
    }
    TaskService.prototype.getAll = function () {
        return this.http.get(apiUrl);
    };
    TaskService.prototype.getCarsByUserId = function (id) {
        return this.http.get(apiUrl + "/tasks/" + id);
    };
    TaskService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
