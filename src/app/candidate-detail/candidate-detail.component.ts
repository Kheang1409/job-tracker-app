import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidatesDataService } from '../services/candidates-data.service';
import { Candidate } from '../classes/candidate';
import { UsersDataService } from '../services/users-data.service';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { countries } from '../data/countries';
import { environment } from '../../environments/environment.development';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NextStepModalComponent } from '../next-step-modal/next-step-modal.component';

@Component({
  selector: 'app-candidate-detail',
  imports: [CommonModule, NextStepModalComponent],
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.css'
})
export class CandidateDetailComponent implements OnInit {
  jobId!: string;
  candidateId!: string;
  candidate!: Candidate;
  user!: User;
  serverError: string | null = null;
  successMessage: string | null = null;
  loading: boolean = true;
  countryCode!: string;

  showNextStepModal: boolean = false;
  nextStepForm!: FormGroup;

  constructor(
    private _candidateServer: CandidatesDataService,
    private _userServer: UsersDataService,
    private _authService: AuthService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([environment.urlFrontend.login], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }

    this.nextStepForm = this.fb.group({
      name: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.nextDayValidator]],
    });
  }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([environment.urlFrontend.login], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }
    this.getUserProfile();
  }

  nextDayValidator(control: any) {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate <= today) {
      return { invalidDate: 'Appointment date must be the next day or later' };
    }
    return null;
  }

  getUserProfile() {
    this.jobId = this._activatedRouter.snapshot.params['jobId'];
    this.candidateId = this._activatedRouter.snapshot.params['id'];
    this._userServer.getUser(this.candidateId).subscribe({
      next: (user) => {
        this.user = user;
        this.countryCode = countries.find(country => country.name == user.contactNumber.countryCode)?.code ?? '';
        this.getCandidateProfiile(this.jobId, this.candidateId);
        this.loading = false;
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
        this.loading = false;
      }
    });
  }

  getCandidateProfiile(jobId: string, candidateId: string) {
    this._candidateServer.getCandidate(jobId, candidateId).subscribe({
      next: (candidate) => {
        this.candidate = candidate;
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'An unexpected error occurred. Please try again.';
        this.loading = false;
      }
    });
  }

  openNextStepModal() {
    this.showNextStepModal = true;
  }

  closeNextStepModal() {
    this.showNextStepModal = false;
  }

  confirmNextStep() {
    if (this.nextStepForm.invalid) {
      this.serverError = 'Both title and appointment date are required.';
      return;
    }

    const updatedRound = this.nextStepForm.value;

    this._candidateServer.moveOn(this.jobId, this.candidateId, updatedRound).subscribe({
      next: (isMoveOn) => {
        if (isMoveOn) {
          this.showNextStepModal = false;
          this.getCandidateProfiile(this.jobId, this.candidateId);
        }
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'Failed to schedule next step.';
      }
    });
  }

  cancel() {
    this.showNextStepModal = false;
  }

  reject() {
    this._candidateServer.reject(this.jobId, this.candidateId).subscribe({
      next: (isRejected) => {
        if (isRejected) {
          this.getCandidateProfiile(this.jobId, this.candidateId);
        }
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'Failed to reject candidate.';
      }
    });
  }

  select() {
    this._candidateServer.select(this.jobId, this.candidateId).subscribe({
      next: (isSelected) => {
        if (isSelected) {
          this.getCandidateProfiile(this.jobId, this.candidateId);
        }
      },
      error: (error) => {
        this.serverError = error?.error?.message || 'Failed to select candidate.';
      }
    });
  }

  handleNextStep(event: any): void {
    console.log('Next step confirmed with event:', event);
  }
}