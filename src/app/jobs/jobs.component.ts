import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JobsDataService } from '../services/jobs-data.service';
import { Job } from '../classes/job';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs!: Job[];
  pageNumber: number = environment.CONSTAINT.PAGE;
  limit: number = environment.CONSTAINT.LIMIT;
  totalJobs: number = 0;
  totalPages: number = 0;

  constructor(
    private _router: Router,
    private _jobService: JobsDataService
  ) { }

  ngOnInit(): void {
    const storedPage = sessionStorage.getItem('currentPage');
    if (storedPage) {
      this.pageNumber = +storedPage;
    }
    this.getJobCount();
    this.getJobs();
  }

  getJobs(): void {
    this._jobService.getJobs(this.pageNumber, this.limit).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getJobCount(): void{
    this._jobService.getJobCount().subscribe({
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
      sessionStorage.setItem('currentPage', this.pageNumber.toString());
      this.getJobs();
    }
  }
}