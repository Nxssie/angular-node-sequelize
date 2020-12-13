"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditUserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.editUserForm = new forms_1.FormGroup({
            username: new forms_1.FormControl(''),
            name: new forms_1.FormControl(''),
            password: new forms_1.FormControl('')
        });
    }
    EditUserComponent.prototype.ngOnInit = function () {
    };
    EditUserComponent.prototype.onSubmit = function () {
    };
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.sass']
        })
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
