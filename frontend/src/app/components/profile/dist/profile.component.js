"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userService, authService, router) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    ProfileComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var id = localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(id).subscribe(function (user) {
            _this.user = user;
        });
    };
    ProfileComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.deleteUserById(id).subscribe(function () {
            _this.authService.logout();
            _this.router.navigateByUrl("/login");
        });
    };
    ProfileComponent.prototype.generateReport = function (id) {
        var _this = this;
        this.userService.getNumberOfTasksById(id).subscribe(function (counter) {
            window.open("http://localhost:4000/api/reports/" + _this.user.username + "/" + counter);
        });
    };
    ProfileComponent.prototype.editUser = function (id) {
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.sass']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
