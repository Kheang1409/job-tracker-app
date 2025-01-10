import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { UsersDataService } from '../users-data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, BannerComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userForm!: FormGroup;
  user!: User;


  createFailMessage: string = '';
  isCreateFail: boolean = false;

  home: string = environment.urlFrontend.home;

  constructor(private _formBuilder: FormBuilder, private _usersService: UsersDataService, private _authService: AuthService, private _router: Router) {
    this.user = new User();
    this.redirectToHomePageIfLoggedIn();
  }
  ngOnInit(): void {
    this.userForm = this._formBuilder.group(
      {
        email: '',
        username: '',
        password: '',
        comfirmPassword: ''
      }
    )
  }

  signUp() {
    if (!this.isMissMatch()) {
      this.user.fill(this.userForm);
      this._usersService.createUser(this.user).subscribe(
        {
          next: (user) => {
            this.createFailMessage = '';
            this.isCreateFail = false;
          },
          error: (error) => {
            this.createFailMessage = error.message;
            this.isCreateFail = true;
          },
          complete: () => {
            if (!this.isCreateFail) {
              this.loginToken(this.user)
            }
          }
        }
      )
    }
  }
  loginToken(user: User) {
    this._usersService.getToken(user).subscribe(
      {
        next: (token) => {
          this._authService.setToken(token);
        },
        error: (error) => {
          this.createFailMessage = error;
          this.isCreateFail = true;
        },
        complete: () => {
          this.redirectToHomePageIfLoggedIn();
        }
      }
    )
  }
  isMissMatch() {
    if (this.userForm.value.password !== this.userForm.value.comfirmPassword) {
      this.createFailMessage = environment.message.passwordMissedMatch;
      this.isCreateFail = true;
      return true;
    }
    return false;
  }
  redirectToHomePageIfLoggedIn() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([this.home]);
    }
  }
}
