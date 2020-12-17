import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  getUsernameErrorMessage() {

    if(!this.loginForm.value.username.required) {
      return "Username is required";
    }
    
    if(!this.loginForm.value.username.minLength) {
      return "Username must be 5 characters min.";
    } 

    return "Form invalid";
    
  }

  getPasswordErrorMessage() {
    if(!this.loginForm.value.password.required) {
      return "Password is required";
    }

    return "Form invalid"
  }

  onSubmit(loginData: any):void {
    if(!this.loginForm.valid) {
      console.warn('Provide all the required fields');
      console.log(loginData);
    } else {
      
      let user = {
        id: 0,
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        name: "",
        isAdmin: false
      };

      this.authService.login(user).subscribe((u) => {
        this.router.navigateByUrl("/mytasks");
      })
    }
  }
}
