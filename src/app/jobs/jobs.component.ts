import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../job';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Application } from '../application';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  private pageNumberKey = environment.keys.pageNumberKey;

  page: number = 1;
  total_page!: number;
  total_job!: number;
  jobs: Job[] = new Array<Job>();

  isError: boolean = false;
  errorMessage: string = ''

  userId: string = '';
  status: string = 'Active';

  constructor(private _authService: AuthService, private _router: Router, private _jobsService: JobsDataService) {
    this.page = sessionStorage.getItem(this.pageNumberKey) == null ? 1 : Number(sessionStorage.getItem(this.pageNumberKey))
  }



  ngOnInit(): void {

    if (this._authService.isLoggedIn()) {
      this.userId = this._authService.getUserId()
    }

    this.getTotalPage(this.status)
    this.getJobs(this.page);
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
  }

  getJobs(pageNumber: number): void {
    this._jobsService.getJobs(pageNumber, this.status).subscribe({
      next: (jobs) => {
        this.jobs = jobs.map(_job => _job = Object.assign(new Job(), _job));
        this.isError = false;
        console.log(jobs);
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        this.jobs = [];
        console.log(error.message);
      },
      complete: () => {
      }
    });
  }

  getTotalPage(status: string | null) {
    this._jobsService.getTotalJobs(status).subscribe({
      next: (jobs) => {
        this.total_job = jobs;
        this.total_page = Math.ceil(jobs / environment.numbers.limit);
        if (this.total_page < 1) {
          this.total_page = 1;
        }
        console.log(`jobs: ${jobs}`);
        console.log(`total_page: ${this.total_page}`);
        this.isError = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.log(error.message);
      },
      complete: () => {

      }
    });
  }

  updateJobStatus(jobId: string) {
    this.onAuthorized();
    this._jobsService.updateJobStatus(jobId).subscribe({
      next: (job) => {
        console.log(job);
        this.isError = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.log(error.message);
      },
      complete: () => {
        this.getJobs(this.page);
      }
    });
  }

  apply(jobId: string) {
    this.onAuthorized();
    this._jobsService.applyJob(jobId).subscribe({
      next: (application) => {
        this.jobs.filter(_job => _job.id == jobId).map(_job => _job.newApplication(application));
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.log(error.message);
      },
      complete: () => {

      }
    })
  }

  editJob(jobId: string) {
    this.onAuthorized();
    console.log(`${environment.urlFrontend.editJob}/${jobId}`);
    this._router.navigate([`${environment.urlFrontend.editJob}/${jobId}`]);
  }

  previouse() {
    if (this.page > 1) {
      this.page--;
      this.setPageNumber(this.page);
      this.getJobs(this.page);
    }
  }

  next() {
    if (this.page <= this.total_page - 1) {
      this.page++;
      this.setPageNumber(this.page);
      this.getJobs(this.page);
    }
  }


  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previouse();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }

  setPageNumber(page: number) {
    this.page = page;
    sessionStorage.setItem(this.pageNumberKey, `${page}`);
  }

  onAuthorized() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([environment.urlFrontend.signIn]);
    }
  }


}
