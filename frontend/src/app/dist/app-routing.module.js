"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./components/about/about.component");
var home_component_1 = require("./components/home/home.component");
var profile_component_1 = require("./components/profile/profile.component");
var settings_component_1 = require("./components/settings/settings.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var add_task_component_1 = require("./components/tasks/add-task/add-task.component");
var login_component_1 = require("./components/user/login/login.component");
var register_component_1 = require("./components/user/register/register.component");
var edit_tasks_component_1 = require("./components/tasks/edit-tasks/edit-tasks.component");
var routes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'mytasks', component: tasks_component_1.TasksComponent },
    { path: 'settings', component: settings_component_1.SettingsComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'add-task', component: add_task_component_1.AddTaskComponent },
    { path: 'edit-task', component: edit_tasks_component_1.EditTasksComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
