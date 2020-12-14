import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  getCurrentUser() {
    let userId = +localStorage.getItem("ACTUAL_USER_ID")!
    this.userService.getUserById(userId).subscribe((u) => {
      this.user = u;
    })
  }

}
