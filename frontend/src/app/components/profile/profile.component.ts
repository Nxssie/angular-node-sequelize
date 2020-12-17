import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    let id = <number><unknown>localStorage.getItem("ACTUAL_USER_ID");
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe(()=> {
      this.authService.logout();
      this.router.navigateByUrl("/login");
    })
  }

  editUser(id: number) {
    
  }

}
