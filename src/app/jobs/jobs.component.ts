import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../job';
import { environment } from '../../environments/environment.development';

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

  constructor(private _jobsService: JobsDataService) {
    this.page = sessionStorage.getItem(this.pageNumberKey) == null ? 1 : Number(sessionStorage.getItem(this.pageNumberKey))
  }

  getRestaurants(pageNumber: number): void {
    this._jobsService.getRestaurants(pageNumber).subscribe(jobs => {
      this.jobs = jobs;
      console.log(this.jobs)
    });

    this._jobsService.getRestaurants(pageNumber).subscribe({
      next: (jobs) => {
        this.jobs = jobs;
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
    this.getRestaurants(this.page);
  }

  getTotalPage(name: string | null) {
    this._jobsService.getTotalRestaurants(name).subscribe(restaurants => {
      this.total_page = Math.ceil(restaurants / environment.numbers.limit);
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
      this.getRestaurants(this.page);
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
      this.getRestaurants(this.page);
      this.previouseDisable = false;
    }
  }
  setPageNumber(page: number) {
    this.page = page;
    sessionStorage.setItem(this.pageNumberKey, `${page}`);
  }
}
