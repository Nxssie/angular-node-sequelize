import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(
    private userService: UserService
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

  }

  editUser(id: number) {
    
  }

}
