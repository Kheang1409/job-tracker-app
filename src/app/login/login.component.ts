import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersDataService } from '../users-data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  token!: string;
  loginForm!: FormGroup;
  user!: User

  unauthorizedMessage: string = '';
  isUnauthorized: boolean = false;

  home: string = environment.urlFrontend.home;

  constructor(private _formBuilder: FormBuilder, private _usersService: UsersDataService, private _authService: AuthService, private _router: Router) {
    this.user = new User();
    this.redirectToHomePageIfLoggedIn();
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: '',
      password: '',
    });
  }
  login() {
    this.user.fill(this.loginForm);
    this.getToken(this.user);
  }
  getToken(user: User) {
    this._usersService.getToken(user).subscribe(
      {
        next: (token) => {
          this.unauthorizedMessage = '';
          this.isUnauthorized = false;
          this._authService.setToken(token);
        },
        error: (error) => {
          this.unauthorizedMessage = error.message;
          this.isUnauthorized = true;
        },
        complete: () => {
          if (!this.isUnauthorized) {
            this.unauthorizedMessage = '';
            this.isUnauthorized = false;
            this.redirectToHomePageIfLoggedIn();
          }
        }
      }
    )
  }
  redirectToHomePageIfLoggedIn() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([this.home]);
    }
  }
}
