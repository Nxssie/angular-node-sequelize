import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
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
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      name: ['',  [Validators.required, Validators.pattern(this.namePattern)]]
    })
  }

  ngOnInit(): void {
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
        this.router.navigateByUrl("/login");
      })
    }
  }

}
