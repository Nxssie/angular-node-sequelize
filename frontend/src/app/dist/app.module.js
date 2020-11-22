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
var slider_1 = require("@angular/material/slider");
var layout_1 = require("@angular/cdk/layout");
var toolbar_1 = require("@angular/material/toolbar");
var card_1 = require("@angular/material/card");
var button_1 = require("@angular/material/button");
var sidenav_1 = require("@angular/material/sidenav");
var icon_1 = require("@angular/material/icon");
var list_1 = require("@angular/material/list");
var sidenav_component_1 = require("./components/sidenav/sidenav.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var about_component_1 = require("./components/about/about.component");
var profile_component_1 = require("./components/profile/profile.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var settings_component_1 = require("./components/settings/settings.component");
var http_1 = require("@angular/common/http");
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
                settings_component_1.SettingsComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                slider_1.MatSliderModule,
                animations_1.BrowserAnimationsModule,
                layout_1.LayoutModule,
                toolbar_1.MatToolbarModule,
                button_1.MatButtonModule,
                sidenav_1.MatSidenavModule,
                icon_1.MatIconModule,
                list_1.MatListModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                card_1.MatCardModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
