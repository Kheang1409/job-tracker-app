import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../job';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { CustomPipe } from '../custom.pipe';
import { ScheduleInterviewModalComponent } from '../schedule-interview-modal/schedule-interview-modal.component';
import { StatusRemark } from '../status';

@Component({
  selector: 'app-job',
  imports: [CommonModule, CustomPipe, ScheduleInterviewModalComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  jobId: string = '';
  job: Job = new Job();
  selectedApplicantId: string = '';
  userId: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  isModalVisible: boolean = false;

  constructor(private _authService: AuthService, private _activatedRouter: ActivatedRoute, private _jobsService: JobsDataService) { }

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this.userId = this._authService.getUserId();
    }
    this.jobId = this._activatedRouter.snapshot.params['id'];
    this.getJob();
  }

  getJob() {
    this._jobsService.getJob(this.jobId).subscribe({
      next: (job) => {
        this.job = Object.assign(new Job(), job);
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.error(error.message);
      },
      complete: () => {

      }
    });
  }

  action(applicantId: string) {
    this.selectedApplicantId = applicantId;
    this.isModalVisible = true;
    console.log(this.isModalVisible);
  }

  closeModal() {
    this.isModalVisible = false;
  }

  updateApplicantStatus(jobId: string, applicantId: string, status: StatusRemark) {
    this._jobsService.updateApplicantStatus(jobId, applicantId, status).subscribe({
      next: (updatedJob) => {
        this.job.applications.filter(application => application.id == applicantId).map(application => application.status = status.status);
        alert(updatedJob);
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = error.message;
        console.error(error.message);
      },
      complete: () => {
        this.closeModal();
      }
    });
    this.closeModal();
  }

  isTheOwner(): boolean {
    return this.job.userId == this.userId;
  }

  isActionDisable(status: string): boolean {
    return status == 'Interview' || status == 'Applied';
  }

  onUpdateApplicantStatusd(event: { jobId: string; applicantId: string; status: StatusRemark }) {
    const { jobId, applicantId, status } = event;
    this.updateApplicantStatus(jobId, applicantId, status);
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Applied':
        return 'badge-primary';
      case 'Interview':
        return 'badge-info';
      case 'Selected':
        return 'badge-success';
      case 'Rejected':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

}