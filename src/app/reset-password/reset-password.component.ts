import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitting = false;
  email: string | null = null;
  token: string | null = null;

  private timeoutId: any;
  private readonly TIMEOUT = 3 * 60 * 1000;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    const navState = history.state;
    if (!navState?.email || !navState?.token) {
      this._router.navigate(['/forgot-password']);
    } else {
      this.email = navState.email;
      this.token = navState.token;
      this._authService.setResetPasswordToken(navState.token);
    }

    this.startInactivityTimeout();
  }

  startInactivityTimeout() {
    this.clearInactivityTimeout();

    this.timeoutId = setTimeout(() => {
      alert('Session expired. Please request a new password reset link.');
      this._router.navigate(['/forgot-password']);
    }, this.TIMEOUT);
  }

  clearInactivityTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  ngOnDestroy(): void {
    this.clearInactivityTimeout();
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    this._authService.resetPassword(
        this.resetPasswordForm.value.otp,
        this.resetPasswordForm.value.password
      ).subscribe({
        next: () => {
          this.successMessage = 'Password reset successfully. You can now log in.';
          this.submitting = false;
          this.resetPasswordForm.reset();
        },
        error: (error) => {
          // console.error(error);
          this.errorMessage = error?.error?.message || 'Failed to reset password. Please try again.';
          this.submitting = false;
        }
    });
  }
}
