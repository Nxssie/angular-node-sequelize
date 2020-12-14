import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass'],
})
export class EditUserComponent implements OnInit {
  user!: User;

  editUserForm = new FormGroup({
    username: new FormControl(
      [''],
      [Validators.required, Validators.minLength(5)]
    ),
    password: new FormControl([''], [Validators.required]),
    name: new FormControl([''], [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getData();
  }

  getData() {
    let id =  +localStorage.getItem("ACTUAL_USER_ID")!;
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
      this.editUserForm.patchValue({
        username: user.username,
        name: user.name
      })
    })
  }

  onSubmit(editUserData: any) {
    if (!this.editUserForm.valid) {
      const dialogRef = this.dialog.open(InvalidRegisterFormModal);
    } else {
      let user: User = {
        id: 0,
        username: this.editUserForm.value.username,
        name: this.editUserForm.value.name,
        password: this.editUserForm.value.password,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.userService.update(user, user.id).subscribe((u) => {
        console.log(u);
        //this.router.navigateByUrl("/login");
      });
    }
  }

  getCurrentUser() {
    let id =  <number><unknown>localStorage.getItem("ACTUAL_USER_ID");
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }
}

@Component({
  selector: 'invalid-register-form-modal',
  templateUrl: '../register/invalid.register.form.modal.html',
  styleUrls: ['../register/register.component.sass'],
})
export class InvalidRegisterFormModal {
  constructor(public dialogRef: MatDialogRef<InvalidRegisterFormModal>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
