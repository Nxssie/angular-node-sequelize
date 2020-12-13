import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';


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
    private authService: AuthService
  ) { 
    /* this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      name: ['',  [Validators.required]]
    }) */
  }

  get username() {
    return this.registerForm.get('username');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    })
  }

  onSubmit(userData: any) {
    if(!this.registerForm.valid) {
      console.warn('Please provide all the required values!');
      console.log(userData)
    } else {

      let user = {
        id: 0,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        name: this.registerForm.value.name,
        isAdmin: false
      }
      this.authService.register(user).subscribe((u) => {
        console.log(u);
        //this.router.navigateByUrl("/login");
      })
    }
  }

}
