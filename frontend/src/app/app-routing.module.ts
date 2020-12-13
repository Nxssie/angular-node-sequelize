import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent} from './components/tasks/add-task/add-task.component'
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EditTasksComponent } from './components/tasks/edit-tasks/edit-tasks.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent},
  { path: 'mytasks', component: TasksComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTasksComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-user', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
