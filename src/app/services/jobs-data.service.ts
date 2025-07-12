import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Job } from '../classes/job';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobDetail } from '../classes/jobDetail';
import { Candidate } from '../classes/candidate';
import { handler } from '../untils/error-handler-utils';

@Injectable({
  providedIn: 'root'
})
export class JobsDataService {
  private _baseUrl = environment.api.baseUrl;
  private _jobs = environment.api.jobs;
  private _candidates = environment.api.jobs.candidates;

  constructor(
    private _httpClient: HttpClient
  ) { 

  }

  getJobCount(
    title?: string,
    companyName?: string,
    candidateId?: string,
    authorId?: string)
  : Observable<number> {
    const params: any = {};
    if (title) params.title = title;
    if (companyName) params.companyName = companyName;
    if (candidateId) params.candidateId = candidateId;
    if (authorId) params.authorId = authorId;
    
    const url: string = `${this._baseUrl}/${this._jobs.base}/${this._jobs.total}`;
    return this._httpClient.get<number>(url, { params }).pipe(
      catchError(handler)
    );
  }

  getJobs(
    page: number,
    limit: number,
    title?: string,
    companyName?: string,
    candidateId?: string,
    authorId?: string)
  : Observable<Job[]> {
    const params: any = {
      pageNumber: page.toString(),
      limit: limit.toString()
    };

    if (title) params.title = title;
    if (companyName) params.companyName = companyName;
    if (candidateId) params.candidateId = candidateId;
    if (authorId) params.authorId = authorId;

    const url: string = `${this._baseUrl}/${this._jobs.base}`;
    return this._httpClient.get<Job[]>(url, { params }).pipe(
      catchError(handler)
    );
  }

  getJob(id: string) : Observable<JobDetail>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}`;
    return this._httpClient.get<JobDetail>(url).pipe(
      catchError(handler)
    );
  }

  createJob(job: any): Observable<any>{
    const url: string = `${this._baseUrl}/${this._jobs.base}`;
    return this._httpClient.post<any>(url, job).pipe(
      catchError(handler)
    );
  }

  updateJob(id: string, job: any): Observable<boolean>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}`;
    return this._httpClient.put<boolean>(url, job).pipe(
      catchError(handler)
    );
  }

  updateStatusJob(id: string, status: string){
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}/${this._jobs.status}`;
    return this._httpClient.put<boolean>(url, {status}).pipe(
      catchError(handler)
    );
  }

  deleteJob(id: string): Observable<boolean>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}`;
    console.log(url);
    return this._httpClient.delete<boolean>(url).pipe(
      catchError(handler)
    );
  }

  applied(id: string) : Observable<Candidate>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}/${this._candidates.base}`;
    return this._httpClient.post<Candidate>(url, { }).pipe(
      catchError(handler)
    );
  }

  withdraw(id: string) : Observable<void>{
    const url: string = `${this._baseUrl}/${this._jobs.base}/${id}/${this._candidates.base}/${this._jobs.me}`;
    return this._httpClient.delete<void>(url).pipe(
      catchError(handler)
    );
  }
}
