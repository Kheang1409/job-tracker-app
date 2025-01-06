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

  previouseDisable: boolean = false;
  nextDisable: boolean = false;

  private pageNumberKey = 'pageNumber';

  page: number = 1;
  total_page!: number;
  jobs: Job[] = new Array<Job>();

  searchQuery: string = '';

  isError: boolean = false;
  errorMessage: string = ''

  userId: string = '';

  constructor(private _authService: AuthService, private _router: Router, private _jobsService: JobsDataService) {
    this.page = sessionStorage.getItem(this.pageNumberKey) == null ? 1 : Number(sessionStorage.getItem(this.pageNumberKey))
  }

  getJobs(pageNumber: number): void {
    this._jobsService.getJobs(pageNumber).subscribe(jobs => {
      this.jobs = jobs;
      console.log(this.jobs)
    });

    this._jobsService.getJobs(pageNumber).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.checkIsApplied(jobs);
        this.isError = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        this.jobs = [];
      },
      complete: () => {
        this.previouseDisable = false;
        this.nextDisable = false;
      }
    });
  }

  ngOnInit(): void {
    this.getTotalPage(this.searchQuery)
    this.getJobs(this.page);
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
  }

  getTotalPage(name: string | null) {
    this._jobsService.getTotalJobs(name).subscribe(jobs => {
      this.total_page = Math.ceil(jobs / environment.numbers.limit);
      if (this.total_page < 1) {
        this.total_page = 1;
      }
    });
  }

  previouse() {
    if (this.page > 1) {
      this.nextDisable = false;
      this.page--;
      this.setPageNumber(this.page);
      this.getJobs(this.page);
    }
    else {
      this.previouseDisable = true;
    }
  }

  next() {
    if (this.page > this.total_page - 1) {
      this.nextDisable = true;
    }
    else {
      this.page++;
      this.setPageNumber(this.page);
      this.getJobs(this.page);
      this.previouseDisable = false;
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
  apply(jobId: string) {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([environment.urlFrontend.signIn]);
    }
    var job = this.jobs.filter(job => job.id == jobId)[0];
    if (job) {
      job = Object.assign(new Job(), job);
      this._jobsService.applyJob(jobId).subscribe(application => {
        job.newApplication(application);
      });
    }
  }
  checkIsApplied(jobs: Job[]) {
    if (this._authService.getToken()) {
      const token = `${this._authService.getToken()}`
      const userPayload: any = jwtDecode(token);
      this.userId = userPayload.sub;
      for (let job of jobs) {
        const found = job.applications.find(application => application.userId == this.userId)
        if (found) {
          job.isApplied = true;
        }
      }
    }
  }
}
