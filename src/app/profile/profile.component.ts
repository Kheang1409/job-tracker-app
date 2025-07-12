import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { addSkillToList, removeSkillFromList } from '../untils/skills-utils';
import { countries } from '../data/countries';
import { environment } from '../../environments/environment.development';
import { phoneNumberValidator } from '../untils/phone-utils';
import { User } from '../classes/user';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  serverError: string | null = null;
  successMessage: string | null = null;
  generalError: string | null = null;
  user!: User;

  countries = countries;

  skillInput = '';
  skillsList: { name: string }[] = [];

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
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), phoneNumberValidator]],
      country: ['United States', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      skills: [[], []]
    });
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this.getUserProfile();
    else
      this._router.navigate([environment.urlFrontend.login]);
  }

  getUserProfile(): void {
    this.submitted = true;
    this.serverError = null;
    this._userService.getUserProfile().subscribe({
      next: (user) => {
        // console.log(user);
        this.user = user; // current user stored
        this.pathValue(user);
        this.skillsList = user.skills || [];
        
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

    // Check if no changes were made
    if (!this.profileForm.dirty) {
      this.generalError = 'No changes made to the form.';
      return;
    }

    // If the form is invalid, mark all as touched and exit
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    // Proceed with the update if form is valid
    this._userService.updateUserProfile(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.generalError = null;
        this.resetFormState();
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }

  private resetFormState(): void {
    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }

  addSkill(event: Event): void {
    event.preventDefault();
    addSkillToList(this.skillInput, this.skillsList, (updatedSkills) => {
      this.skillsList = updatedSkills;
      const skillsControl = this.profileForm.get('skills');
      skillsControl?.setValue(this.skillsList);
      skillsControl?.markAsDirty();
    }, (updatedSkills) => {
      const skillsControl = this.profileForm.get('skills');
      skillsControl?.setValue(updatedSkills);
      skillsControl?.markAsDirty();
    });
    this.skillInput = '';
  }

  removeSkill(skillName: string): void {
    removeSkillFromList(skillName, this.skillsList, (updatedSkills) => {
      this.skillsList = updatedSkills;
      const skillsControl = this.profileForm.get('skills');
      skillsControl?.setValue(this.skillsList);
      skillsControl?.markAsDirty();
    }, (updatedSkills) => {
      const skillsControl = this.profileForm.get('skills');
      skillsControl?.setValue(updatedSkills);
      skillsControl?.markAsDirty();
    });
    // console.log(this.skillsList);
  }

  cancel(): void {
    this.profileForm.reset();
    this.pathValue(this.user);
    this.serverError = null;
    this.successMessage = null;
  }

  pathValue(user: User){
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
      gender: user.gender,
      countryCode: user.contactNumber?.countryCode,
      phoneNumber: user.contactNumber?.phoneNumber,
      country: user.address?.country,
      street: user.address?.street,
      city: user.address?.city,
      state: user.address?.state,
      postalCode: user.address?.postalCode,
      skills: this.skillsList
    });
  }
}
