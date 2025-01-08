import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../job';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  @Input() userId!: string
  @Input() jobs!: Job[]

  @Output() updateStatusEvent = new EventEmitter<string>();
  @Output() applyEvent = new EventEmitter<string>();
  @Output() editJobEvent = new EventEmitter<string>();

  updateStatus(jobId: string) {
    this.updateStatusEvent.emit(jobId); // Emit jobId to parent
  }

  apply(jobId: string) {
    this.applyEvent.emit(jobId); // Emit jobId to parent
  }

  editJob(jobId: string) {
    this.editJobEvent.emit(jobId); // Emit jobId to parent
  }

}
