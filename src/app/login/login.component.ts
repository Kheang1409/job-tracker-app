import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;
  returnUrl: string | null = null;
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ){

  }

  ngOnInit(): void {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/jobs';
  }

  login(){
    if (this.loginForm.invalid) {
      return;
    }
    this._authService.login(
      this.loginForm.value?.email || '',
      this.loginForm.value?.password || ''
    ).subscribe({
      next: (response) => {
        this._authService.setToken(response.token);
        this.errorMessage = null;  
      },
      error: (error) => {
        // console.error(error.message);
        this.errorMessage = error.message;
      },
      complete:() =>{
        if (this.errorMessage === null) {
          this._router.navigateByUrl(this.returnUrl!);
        }
      }
    });
  }
}
