import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusRemark } from '../status';

@Component({
  selector: 'app-schedule-interview-modal',
  templateUrl: './schedule-interview-modal.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './schedule-interview-modal.component.css'
})
export class ScheduleInterviewModalComponent {
  @Input() jobId: string = '';
  @Input() applicantId: string = '';

  status: StatusRemark = new StatusRemark();

  @Output() updateApplicationStatusEvent = new EventEmitter<{ jobId: string; applicantId: string; status: StatusRemark }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  updateApplicationStatus() {
    this.updateApplicationStatusEvent.emit({
      jobId: this.jobId,
      applicantId: this.applicantId,
      status: this.status,
    });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}


