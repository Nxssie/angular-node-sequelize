"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, router, authService) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        // requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces
        this.passwordPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$";
        /*  Person's name (first, last, or both) in any letter case. Although not perfect, this expression
            will filter out many incorrect name formats (especially numerics and invalid special characters).*/
        this.namePattern = '^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$';
        this.registerForm = this.fb.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(20)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.passwordPattern)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.namePattern)]]
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onSubmit = function (userData) {
        var _this = this;
        if (!this.registerForm.valid) {
            console.warn('Please provide all the required values!');
            console.log(userData);
        }
        else {
            var user = {
                id: 0,
                username: this.registerForm.value.username,
                password: this.registerForm.value.password,
                name: this.registerForm.value.name,
                isAdmin: false
            };
            this.authService.register(user).subscribe(function (u) {
                _this.router.navigateByUrl("/login");
            });
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.sass']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
