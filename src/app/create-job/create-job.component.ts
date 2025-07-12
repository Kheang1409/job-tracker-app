import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JobsDataService } from '../services/jobs-data.service';
import { addSkillToList, removeSkillFromList } from '../untils/skills-utils';
import { dateToISODateString } from '../untils/date-format-utils';

@Component({
  selector: 'app-create-job',
  imports: [CommonModule,  ReactiveFormsModule, FormsModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent implements OnInit{

  jobForm: FormGroup;
  activeTab = 1;

  skillInput = '';
  skillsList: { name: string }[] = [];
  
  todayDate: string = '';

  serverError: string | null = null;


  ngOnInit(): void {
    if(!this._authService.isLoggedIn()){
      this._router.navigate(['/login'], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }
  }

  constructor(
    private _router: Router,
    private fb: FormBuilder, 
    private _authService: AuthService,
    private _jobServive: JobsDataService
  ) {
    this.todayDate = dateToISODateString();;
    
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      workMode: ['', [Validators.required, Validators.maxLength(100)]],
      employmentType: ['', [Validators.required, Validators.maxLength(100)]],
      numberOfOpenings: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      minExperience: [0, [Validators.min(0), Validators.max(20)]],
      minSalary: [0, [Validators.min(0)]],
      maxSalary: [0, [Validators.min(0)]],
      currency: ['', [Validators.required]],
      requiredSkills: [[], [this.arrayRequiredValidator()]],
      jobDescription: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, this.expirationDateValidator]]
    });
  }

  // Sync range and number inputs with validation for min/max
  onInputChange(controlName: string, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);

    const control = this.jobForm.get(controlName);
    if (!control) return;

    const min = input.min ? Number(input.min) : Number.NEGATIVE_INFINITY;
    const max = input.max ? Number(input.max) : Number.POSITIVE_INFINITY;

    if (value < min) value = min;
    if (value > max) value = max;

    control.setValue(value);
  }

  submit(): void {
    if (this.jobForm.valid) {
    this._jobServive.createJob(this.jobForm.value).subscribe({
        next: (response) => {
          // console.log('Job created successfully:', response);
          this._router.navigate(['/my-jobs']);
        },
        error: (error) => {
          // console.error('Error creating job:', error);
          this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
        }
      });
    }else {
      this.jobForm.markAllAsTouched();
    }
  }

  arrayRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (Array.isArray(val) && val.length > 0) {
        return null;
      }
      return { required: true };
    };
  }

  expirationDateValidator(control: any) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  addSkill(event: Event): void {
    event.preventDefault();
    addSkillToList(this.skillInput, this.skillsList, (updatedSkills) => {
      this.skillsList = updatedSkills;
      this.jobForm.get('requiredSkills')?.setValue(this.skillsList);
    }, (updatedSkills) => {
      this.jobForm.get('requiredSkills')?.setValue(updatedSkills);
    });
    this.skillInput = '';
  }

  removeSkill(skillName: string): void {
    removeSkillFromList(skillName, this.skillsList, (updatedSkills) => {
      this.skillsList = updatedSkills;
      this.jobForm.get('requiredSkills')?.setValue(this.skillsList);
    }, (updatedSkills) => {
      this.jobForm.get('requiredSkills')?.setValue(updatedSkills);
    });
    console.log(this.skillsList);
  }
}
