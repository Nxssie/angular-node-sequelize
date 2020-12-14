"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var auth_module_1 = require("./components/user/auth/auth.module");
var slider_1 = require("@angular/material/slider");
var layout_1 = require("@angular/cdk/layout");
var toolbar_1 = require("@angular/material/toolbar");
var card_1 = require("@angular/material/card");
var forms_1 = require("@angular/forms");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var select_1 = require("@angular/material/select");
var button_1 = require("@angular/material/button");
var sidenav_1 = require("@angular/material/sidenav");
var icon_1 = require("@angular/material/icon");
var list_1 = require("@angular/material/list");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var checkbox_1 = require("@angular/material/checkbox");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var snack_bar_1 = require("@angular/material/snack-bar");
var dialog_1 = require("@angular/material/dialog");
var sidenav_component_1 = require("./components/sidenav/sidenav.component");
var about_component_1 = require("./components/about/about.component");
var profile_component_1 = require("./components/profile/profile.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var settings_component_1 = require("./components/settings/settings.component");
var http_1 = require("@angular/common/http");
var add_task_component_1 = require("./components/tasks/add-task/add-task.component");
var login_component_1 = require("./components/user/login/login.component");
var register_component_1 = require("./components/user/register/register.component");
var edit_tasks_component_1 = require("./components/tasks/edit-tasks/edit-tasks.component");
var edit_user_component_1 = require("./components/user/edit-user/edit-user.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                sidenav_component_1.SidenavComponent,
                about_component_1.AboutComponent,
                profile_component_1.ProfileComponent,
                tasks_component_1.TasksComponent,
                settings_component_1.SettingsComponent,
                add_task_component_1.AddTaskComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                edit_tasks_component_1.EditTasksComponent,
                edit_user_component_1.EditUserComponent
            ],
            imports: [
                auth_module_1.AuthModule,
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                slider_1.MatSliderModule,
                animations_1.BrowserAnimationsModule,
                layout_1.LayoutModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                toolbar_1.MatToolbarModule,
                button_1.MatButtonModule,
                sidenav_1.MatSidenavModule,
                icon_1.MatIconModule,
                checkbox_1.MatCheckboxModule,
                list_1.MatListModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                snack_bar_1.MatSnackBarModule,
                dialog_1.MatDialogModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                slide_toggle_1.MatSlideToggleModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
