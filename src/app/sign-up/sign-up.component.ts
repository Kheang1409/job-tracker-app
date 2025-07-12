import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitted = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _userService: UsersDataService,
    private _router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;

    if (this.signUpForm.valid) {
      this._userService.createUser(this.signUpForm.value).subscribe({
        next: (response) => {
          // console.log('User created successfully:', response);
          this._router.navigate(['/login']);

        },
        error: (error) => {
          // console.error('Error creating user:', error);
          this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}