import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  serverError: string | null = null;
  successMessage: string | null = null;
  generalError: string = '';

  countries: string[] = [
    'United States', 'Canada', 'Mexico', 'Argentina', 'Brazil', 'France', 'Germany', 'Italy', 'Australia',
    'Japan', 'India', 'China', 'South Korea', 'South Africa', 'United Kingdom', 'Spain', 'Russia', 'Egypt', 'Nigeria', 'Turkey'
  ];

  constructor(
    private fb: FormBuilder, 
    private _userService: UsersDataService, 
    private _authService: AuthService,
    private _router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d{1,3}\d{7,15}$/)]],
      country: ['United States', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this.getUserProfile();
    else
      this._router.navigate(['/sign-in']);
  }

  getUserProfile(): void {
    this.submitted = true;
    this.serverError = null;
    this._userService.getUserProfile().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          bio: user.bio,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          country: user.address?.country,
          street: user.address?.street,
          city: user.address?.city,
          state: user.address?.state,
          postalCode: user.address?.postalCode
        });
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.serverError = null;
    this.successMessage = null;

    if (this.profileForm.valid) {
      this._userService.updateUserProfile(this.profileForm.value).subscribe({
        next: () => {
          // console.log('Profile updated successfully');
          this.successMessage = 'Profile updated successfully!';
        },
        error: (error) => {
          // console.error('Error updating profile:', error);
          this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';

        }
      });
    } else {
      this.profileForm.markAllAsTouched();
      console.log('Form is not valid');
    }
  }

  cancel(): void {
    this.profileForm.reset();
    this.profileForm.get('country')?.setValue('United States');
    this.serverError = null;
    this.successMessage = null;
    this.getUserProfile();

  }
}
