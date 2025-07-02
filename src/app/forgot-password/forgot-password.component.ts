import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder, 
    private _authService: AuthService,
    private _router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.forgotPasswordForm.valid) {
      this.submitting = true;
      this._authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (response) => {
          this.successMessage = 'Reset link sent! Check your email.';
          this.submitting = false;
          this._router.navigate(['/reset-password'], {
            state: {
              email: this.forgotPasswordForm.value.email,
              token: response.token
            }
          });
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Failed to send reset link. Please try again.';
          this.submitting = false;
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
