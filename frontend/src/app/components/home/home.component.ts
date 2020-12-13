import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  authService!: AuthService;

  constructor() { }

  ngOnInit(): void {
    let actualToken = this.getActualUserToken();
    console.log(actualToken);
  }

  getActualUserToken() {
    return localStorage.getItem("ACCESS_TOKEN");
  }
}
