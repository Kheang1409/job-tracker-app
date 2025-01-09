import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Job } from '../job';
import { AuthService } from '../auth.service';
import { JobsDataService } from '../jobs-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '../location';

@Component({
  selector: 'app-create-job',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {

  activeTab: number = 1;

  jobId!: string;
  job: Job = new Job();
  location: Location = new Location();
  skillsString: string = '';
  isError: boolean = false;
  errorMessage: string = ''


  signIn: string = environment.urlFrontend.signIn;
  home: string = environment.urlFrontend.home;
  private pageNumberKey = environment.keys.pageNumberKey;

  constructor(private _authService: AuthService, private _jobsService: JobsDataService, private _router: Router, private _activatedRouter: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.onAuthorized();
    this.job.location = this.location;
    this.job.applications = [];
  }

  create(): void {
    this.onAuthorized();
    this.job.stringSkillsToArray(this.skillsString);
    this._jobsService.createJob(this.job).subscribe({
      next: (job) => {
        console.log(job);
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.log(error.message);
      },
      complete: () => {
        this.setPageNumber(1);
        this._router.navigate([this.home]);
      }
    });
  }

  previouse() {
    this.activeTab--;
    this.setActiveTab(this.activeTab);
  }

  next() {
    this.activeTab++;
    this.setActiveTab(this.activeTab);
  }

  setPageNumber(page: number) {
    sessionStorage.setItem(this.pageNumberKey, `${page}`);
  }

  setActiveTab(activeTab: number) {
    this.activeTab = activeTab;
  }

  onAuthorized() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([this.signIn]);
    }
  }
}
