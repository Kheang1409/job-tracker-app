import { Component } from '@angular/core';
import { Job } from '../classes/job';
import { Router, RouterModule } from '@angular/router';
import { JobsDataService } from '../services/jobs-data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-my-jobs',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css'
})
export class MyJobsComponent {
  jobs: Job[] = [];
  pageNumber: number = environment.CONSTAINT.PAGE;
  limit: number = environment.CONSTAINT.LIMIT;
  totalJobs: number = 0;
  totalPages: number = 0;

  userId!: string;

  constructor(
    private _router: Router,
    private _jobService: JobsDataService,
    private _authService: AuthService,
  ) { 

   if(!this._authService.isLoggedIn()){
      this._router.navigate(['/login'], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }
    this.userId = this._authService.userId();
  }

  ngOnInit(): void {
    const storedPage = sessionStorage.getItem('my-currentPage');
    if (storedPage) {
      this.pageNumber = +storedPage;
    }
    this.getJobCount();
    this.getJobs();
  }

  getJobs(): void {
    console.log(this.userId);
    this._jobService.getJobs(
      this.pageNumber, 
      this.limit,
      undefined,
      undefined,
      this.userId, 
      this.userId).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getJobCount(): void{
    this._jobService.getJobCount(
      undefined,
      undefined,
      this.userId, 
      this.userId).subscribe({
      next: (jobCounts) => {
        this.totalJobs = jobCounts;
        if (this.limit > 0) {
          this.totalPages = Math.ceil(this.totalJobs / this.limit);
        } else {
          console.error('Limit must be greater than 0');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  goToJobDetails(id: string): void {
    this._router.navigate(['/job', id]);
  }

  applyJob(job: any): void {
    job.applied = !job.applied;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      sessionStorage.setItem('my-currentPage', this.pageNumber.toString());
      this.getJobs();
    }
  }
}
