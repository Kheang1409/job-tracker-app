import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobsDataService } from '../services/jobs-data.service';
import { AuthService } from '../services/auth.service';
import { addSkillToList, removeSkillFromList } from '../untils/skills-utils';
import { dateToISODateString } from '../untils/date-format-utils';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  jobForm: FormGroup;
  activeTab = 1;
  jobId: string | null = null;

  skillInput = '';
  skillsList: { name: string }[] = [];
  
  todayDate: string = '';

  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private _jobService: JobsDataService,
    private _authService: AuthService
  ) {
    const today = new Date();

    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      workMode: ['', [Validators.required]],
      employmentType: ['', [Validators.required]],
      numberOfOpenings: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      minExperience: [0, [Validators.min(0), Validators.max(20)]],
      requiredSkills: [[], [this.arrayRequiredValidator()]],
      jobDescription: ['', [Validators.required]],
      minSalary: [0, [Validators.min(0)]],
      maxSalary: [0, [Validators.min(0)]],
      currency: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, this.expirationDateValidator]]
    });
  }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login'], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }

    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.loadJobData(this.jobId);
    }
  }

  loadJobData(id: string) {
    this._jobService.getJob(id).subscribe({
      next: (job) => {
        this.skillsList = job.requirementSkills || [];
        this.jobForm.patchValue({
          title: job.title,
          companyName: job.companyName,
          workMode: job.workMode,
          employmentType: job.employmentType,
          numberOfOpenings: job.numberOfOpenings,
          minExperience: job.minExperience,
          requiredSkills: this.skillsList,
          jobDescription: job.jobDescription,
          minSalary: job.salary?.minSalary || 0,
          maxSalary: job.salary?.maxSalary || 0,
          currency: job.salary?.currency || '',
          street: job.jobLocation?.street || '',
          postalCode: job.jobLocation?.postalCode || '',
          city: job.jobLocation?.city || '',
          state: job.jobLocation?.state || '',
          country: job.jobLocation?.country || '',
          expirationDate: dateToISODateString(job.expirationDate) || '',
        });

      this.todayDate = dateToISODateString(job.createdAt);

      },
      error: (error) => {
        console.error(error);
        this.serverError = 'Failed to load job data.';
      }
    });
  }

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
    if (this.jobForm.valid && this.jobId) {
      this._jobService.updateJob(this.jobId, this.jobForm.value).subscribe({
        next: () => this._router.navigate([`/job/${this.jobId}`]),
        error: (err) => {
          this.serverError = err?.error?.message || 'Update failed.';
        }
      });
    } else {
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
      this.skillsList = updatedSkills; // Update the skills list after adding
    });
    this.skillInput = '';
  }

  removeSkill(skillName: string): void {
    removeSkillFromList(skillName, this.skillsList, (updatedSkills) => {
      this.skillsList = updatedSkills; // Update the skills list after removal
    });
  }
}
