import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-next-step-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './next-step-modal.component.html',
  styleUrl: './next-step-modal.component.css'
})
export class NextStepModalComponent {
  @Input() jobId: string = '';
  @Input() candidateId: string = '';
  @Input() showModal: boolean = false;
  @Input() serverError: string | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() nextStepConfirmed = new EventEmitter<any>();

  nextStepForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.nextStepForm = this.fb.group({
      name: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.nextDayValidator]]
    });
  }

  nextDayValidator(control: any) {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate <= today) {
      return { invalidDate: 'Appointment date must be the next day or later' };
    }
    return null;
  }

  cancel() {
    this.closeModal.emit();
  }

  confirmNextStep() {
    if (this.nextStepForm.invalid) {
      return;
    }

    const nextStepData = {
      ...this.nextStepForm.value,
      jobId: this.jobId,
      candidateId: this.candidateId
    };

    this.nextStepConfirmed.emit(nextStepData);
    this.closeModal.emit();
  }
  
}
