import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../classes/candidate';
import { catchError, Observable } from 'rxjs';
import { handler } from '../untils/error-handler-utils';

@Injectable({
  providedIn: 'root'
})
export class CandidatesDataService {
  private _baseUrl = environment.api.baseUrl;
  private _jobs = environment.api.jobs;
  private _candidates = environment.api.jobs.candidates;
  constructor(
    private _httpClient: HttpClient
  ) { }
  
  getCandidates(jobId: string):  Observable<Candidate[]>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${jobId}/${this._candidates.base}`;
    return this._httpClient.get<Candidate[]>(url).pipe(
      catchError(handler)
    );
  }

  getCandidate(jobId: string, candidateId: string):  Observable<Candidate>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${jobId}/${this._candidates.base}/${candidateId}`;
    return this._httpClient.get<Candidate>(url).pipe(
      catchError(handler)
    );
  }

  moveOn(jobId: string, candidateId: string, round: any){
    const url: string = `${this._baseUrl}/${this._jobs.base}/${jobId}/${this._candidates.base}/${candidateId}`;
    return this._httpClient.patch<Candidate>(url, round).pipe(
      catchError(handler)
    );
  }

  reject(jobId: string, candidateId: string){
    const url: string = `${this._baseUrl}/${this._jobs.base}/${jobId}/${this._candidates.base}/${candidateId}/${this._candidates.rejections}`;
    return this._httpClient.post<Candidate>(url, {}).pipe(
      catchError(handler)
    );
  }

  select(jobId: string, candidateId: string){
    const url: string = `${this._baseUrl}/${this._jobs.base}/${jobId}/${this._candidates.base}/${candidateId}/${this._candidates.selection}`;
    return this._httpClient.post<Candidate>(url, {}).pipe(
      catchError(handler)
    );
  }
}
