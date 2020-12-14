import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  user!: User;

  registerForm!: FormGroup;
  // requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces
  passwordPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$";

  /*  Person's name (first, last, or both) in any letter case. Although not perfect, this expression 
      will filter out many incorrect name formats (especially numerics and invalid special characters).*/
  namePattern = '^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { 
    /* this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      name: ['',  [Validators.required]]
    }) */


    this.registerForm = new FormGroup({
      username: new FormControl([''], [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl([''], [
        Validators.required
      ]),
      name: new FormControl([''], [
        Validators.required
      ])
    })

  }

  ngOnInit(): void {
  }

  getErrorMessage() {

    if(!this.registerForm.value.username.required) {
      return "Username is required";
    }
    
    if(!this.registerForm.value.name.required) {
      return "Name is required";
    }
    
    if(!this.registerForm.value.password.required) {
      return "Password is required";
    }

    if(!this.registerForm.value.username.minLength) {
      return "Username must be 5 characters min.";
    } 

    return "Form invalid";
    
  }

  onSubmit(userData: any) {
    if(!this.registerForm.valid) {
        const dialogRef = this.dialog.open(InvalidRegisterFormModal);
    } else {

      let user: User = {
        id: 0,
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.authService.register(user).subscribe((u) => {
        console.log(u);
        //this.router.navigateByUrl("/login");
      })
    }
  }

  
}

@Component({
  selector: 'invalid-register-form-modal',
  templateUrl: 'invalid.register.form.modal.html',
  styleUrls: ['./register.component.sass']
})
export class InvalidRegisterFormModal {

  constructor(
    public dialogRef: MatDialogRef<InvalidRegisterFormModal>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}