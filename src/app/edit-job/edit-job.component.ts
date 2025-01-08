import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { Job } from '../job';
import { JobsDataService } from '../jobs-data.service';

@Component({
  selector: 'app-edit-job',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent {

  activeTab: number = 1;

  jobId!: string;
  job: Job = new Job();

  isError: boolean = false;
  errorMessage: string = ''

  skillsString: string = ''

  constructor(private _authService: AuthService, private _jobsService: JobsDataService, private _router: Router, private _activatedRouter: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.onAuthorized();
    this.getJob();
  }


  getJob() {
    this.jobId = this._activatedRouter.snapshot.params[environment.params.jobId];
    this._jobsService.getJob(this.jobId).subscribe({
      next: (job) => {
        this.job = Object.assign(new Job(), job);
        this.skills = this.job.skills
        console.log(job)
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

  update(): void {
    this.onAuthorized();
    this.job.skills = this.skills;
    this._jobsService.updateJob(this.jobId, this.job).subscribe({
      next: (job) => {
        console.log(job);
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

  get skills(): string[] {
    return this.skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  }

  set skills(skills: string[]) {
    this.skillsString = skills.join(', ');
  }

  previouse() {
    this.activeTab--;
    this.setActiveTab(this.activeTab);
  }

  next() {
    this.activeTab++;
    this.setActiveTab(this.activeTab);
  }

  setActiveTab(activeTab: number) {
    this.activeTab = activeTab;
  }

  onAuthorized() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate([environment.urlFrontend.signIn]);
    }
  }
}
