import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsDataService } from '../services/jobs-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobDetail } from '../classes/jobDetail';
import { AuthService } from '../services/auth.service';
import { Candidate } from '../classes/candidate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobId!: string;
  job!: JobDetail;
  userId!: string;
  userEmail!: string;
  isApplying = false;
  currentUserCandidate?: Candidate;
  candiateCount!: number;
  errorMessage: string | null = null;

  // ✅ Track UI loading state
  loading = {
    apply: false,
    withdraw: false,
    delete: false,
    close: false,
    reopen: false
  };

  constructor(
    private _jobService: JobsDataService,
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {
    if (this._authService.isLoggedIn()) {
      this.userId = this._authService.userId() || '';
    }
  }

  ngOnInit(): void {
    this.getJobDetail();
  }

  getJobDetail(): void {
    this.jobId = this._activatedRouter.snapshot.params['id'];
    this._jobService.getJob(this.jobId).subscribe({
      next: (job) => {
        this.job = Object.assign(new JobDetail(), job);
        this.errorMessage = null;
        this.candiateCount = this.job.candidateCount();
        this.setCandidateState();
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  setCandidateState(): void {
    const candidate = this.job.candidates.find(
      c => c.candidateId === this.userId && c.status === 'Applied'
    );
    this.currentUserCandidate = candidate;
    this.isApplying = candidate?.status === 'Applied' || candidate?.status === 'Selected';
  }

  onApply(): void {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login'], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }

    this.loading.apply = true;

    this._jobService.applied(this.jobId).subscribe({
      next: (candidate) => {
        const newCandidate = Object.assign(new Candidate(), candidate);
        this.job.candidates.push(newCandidate);
        this.currentUserCandidate = newCandidate;
        this.isApplying = true;
        this.setCandidateState();
        this.candiateCount += 1;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.loading.apply = false;
      }
    });
  }

  onWithdraw(): void {
    if (!this.isApplying) return;

    this.loading.withdraw = true;

    this._jobService.withdraw(this.jobId).subscribe({
      next: () => {
        if (this.currentUserCandidate) {
          this.currentUserCandidate.status = 'Withdrawn';
        }
        this.isApplying = false;
        this.candiateCount -= 1;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.loading.withdraw = false;
      }
    });
  }

  deleteJob(): void {
    this.loading.delete = true;

    this._jobService.deleteJob(this.jobId).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this._router.navigate(['/jobs']);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.loading.delete = false;
      }
    });
  }

  onCloseApplication(): void {
    if (this.job.status.toLowerCase() === 'closed') return;

    this.loading.close = true;

    // this._jobService.closeJob(this.jobId).subscribe({
    //   next: () => {
    //     this.job.status = 'closed';
    //     this.errorMessage = null;
    //   },
    //   error: (error) => {
    //     this.errorMessage = error.message;
    //   },
    //   complete: () => {
    //     this.loading.close = false;
    //   }
    // });
  }

  onReopenApplication(): void {
    if (this.job.status.toLowerCase() === 'active') return;

    this.loading.reopen = true;

    // this._jobService.reopenJob(this.jobId).subscribe({
    //   next: () => {
    //     this.job.status = 'active';
    //     this.errorMessage = null;
    //   },
    //   error: (error) => {
    //     this.errorMessage = error.message;
    //   },
    //   complete: () => {
    //     this.loading.reopen = false;
    //   }
    // });
  }
}