"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvalidRegisterFormModal = exports.EditUserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(userService, authService, router, dialog) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.dialog = dialog;
        this.editUserForm = new forms_1.FormGroup({
            username: new forms_1.FormControl([''], [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            password: new forms_1.FormControl([''], [forms_1.Validators.required]),
            name: new forms_1.FormControl([''], [forms_1.Validators.required])
        });
    }
    EditUserComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
        this.getData();
    };
    EditUserComponent.prototype.getData = function () {
        var _this = this;
        var id = +localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(id).subscribe(function (user) {
            _this.user = user;
            _this.editUserForm.patchValue({
                username: user.username,
                name: user.name
            });
        });
    };
    EditUserComponent.prototype.onSubmit = function (editUserData) {
        if (!this.editUserForm.valid) {
            var dialogRef = this.dialog.open(InvalidRegisterFormModal);
        }
        else {
            var user = {
                id: 0,
                username: this.editUserForm.value.username,
                name: this.editUserForm.value.name,
                password: this.editUserForm.value.password,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.userService.update(user, user.id).subscribe(function (u) {
                console.log(u);
                //this.router.navigateByUrl("/login");
            });
        }
    };
    EditUserComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var id = localStorage.getItem("ACTUAL_USER_ID");
        this.userService.getUserById(id).subscribe(function (user) {
            _this.user = user;
        });
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
var InvalidRegisterFormModal = /** @class */ (function () {
    function InvalidRegisterFormModal(dialogRef) {
        this.dialogRef = dialogRef;
    }
    InvalidRegisterFormModal.prototype.onClose = function () {
        this.dialogRef.close();
    };
    InvalidRegisterFormModal = __decorate([
        core_1.Component({
            selector: 'invalid-register-form-modal',
            templateUrl: '../register/invalid.register.form.modal.html',
            styleUrls: ['../register/register.component.sass']
        })
    ], InvalidRegisterFormModal);
    return InvalidRegisterFormModal;
}());
exports.InvalidRegisterFormModal = InvalidRegisterFormModal;
