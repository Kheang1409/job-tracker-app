import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Candidate } from '../classes/candidate';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesDataService } from '../services/candidates-data.service';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent implements OnInit{
  jobId!: string;
  isLoading: boolean = true;
  candidates!: Candidate[];
  errorMessage: string = '';

  constructor(
    private _candidateServer: CandidatesDataService,
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login'], {
        queryParams: { returnUrl: this._router.url }
      });
      return;
    }
    this.getCandidates()
  }
  goToCandidateDetail(candidateId: string){
    this._router.navigate([`job/${this.jobId}/candidate/${candidateId}`]);
  }

  getCandidates(): void {
    this.jobId = this._activatedRouter.snapshot.params['id'];
      this._candidateServer.getCandidates(this.jobId).subscribe({
        next: (candidates) => {
          // console.log(candidates)
          this.candidates = candidates.map(
            candidate => Object.assign(new Candidate(), candidate)
          );
          this.isLoading = false;
        },
        error: (error) => {
          // console.error(error);
          this.isLoading = false;
          this.errorMessage = 'An error occurred while loading candidates. Please try again later.';
        }
      });
  }
}
