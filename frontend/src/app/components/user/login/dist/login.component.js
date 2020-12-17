"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, router, authService) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.loginForm = this.fb.group({
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.getUsernameErrorMessage = function () {
        if (!this.loginForm.value.username.required) {
            return "Username is required";
        }
        if (!this.loginForm.value.username.minLength) {
            return "Username must be 5 characters min.";
        }
        return "Form invalid";
    };
    LoginComponent.prototype.getPasswordErrorMessage = function () {
        if (!this.loginForm.value.password.required) {
            return "Password is required";
        }
        return "Form invalid";
    };
    LoginComponent.prototype.onSubmit = function (loginData) {
        var _this = this;
        if (!this.loginForm.valid) {
            console.warn('Provide all the required fields');
            console.log(loginData);
        }
        else {
            var user = {
                id: 0,
                username: this.loginForm.value.username,
                password: this.loginForm.value.password,
                name: "",
                isAdmin: false
            };
            this.authService.login(user).subscribe(function (u) {
                _this.router.navigateByUrl("/mytasks");
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.sass']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
