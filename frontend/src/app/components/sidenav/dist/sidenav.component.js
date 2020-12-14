"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidenavComponent = void 0;
var core_1 = require("@angular/core");
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent(authService, userService, router) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
    }
    SidenavComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    SidenavComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigateByUrl("/login");
    };
    SidenavComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var userId = +localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(userId).subscribe(function (u) {
            _this.user = u;
        });
    };
    SidenavComponent = __decorate([
        core_1.Component({
            selector: 'app-sidenav',
            templateUrl: './sidenav.component.html',
            styleUrls: ['./sidenav.component.sass']
        })
    ], SidenavComponent);
    return SidenavComponent;
}());
exports.SidenavComponent = SidenavComponent;
