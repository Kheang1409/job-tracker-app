import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './job';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Application } from './application';
import { StatusRemark } from './status';


@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  private _baseUrl = environment.urlApi.baseJobUrl;
  private _asubsetUrl = environment.urlApi.subsetUrl;

  private _totalUrl = environment.urlApi.total;


  private queryPageNumber = environment.urlApi.query.pageNumber;
  private queryStatus = environment.urlApi.query.status;
  private querySort = environment.urlApi.query.sort;


  constructor(private _httpClient: HttpClient) { }

  getJobs(pageNumber: number, status: string | null, sort: string | null): Observable<Job[]> {
    let url: string = this._baseUrl
    url = `${url}?${this.queryPageNumber}=${pageNumber}`
    if (status)
      url = `${url}&${this.queryStatus}=${status}`
    if (sort)
      url = `${url}&${this.querySort}=${sort}`
    return this._httpClient.get<Job[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getJob(jobId: string): Observable<Job> {
    let url: string = this._baseUrl
    url = `${url}/${jobId}`
    return this._httpClient.get<Job>(url).pipe(
      catchError(this.handleError)
    );
  }

  createJob(job: Job): Observable<Job> {
    let url: string = `${this._baseUrl}`;
    return this._httpClient.post<Job>(url, job.jsonify()).pipe(
      catchError(this.handleError)
    );
  }

  updateJob(jobId: string, updatedJob: Job): Observable<Job> {
    let url: string = this._baseUrl
    url = `${url}/${jobId}`
    return this._httpClient.put<Job>(url, updatedJob.jsonify()).pipe(
      catchError(this.handleError)
    );
  }

  getTotalJobs(status: string | null): Observable<number> {
    let url: string = `${this._baseUrl}/${this._totalUrl}`;
    url = `${url}?${this.queryStatus}=${status}`
    return this._httpClient.get<number>(url).pipe(
      catchError(this.handleError)
    );
  }

  applyJob(jobId: string): Observable<Application> {
    let url: string = this._baseUrl;
    url = `${url}/${jobId}/${this._asubsetUrl}`
    return this._httpClient.post<Application>(url, null).pipe(
      catchError(this.handleError)
    );
  }
  updateJobStatus(jobId: string): Observable<Job> {
    let url: string = this._baseUrl
    url = `${url}/${jobId}/${environment.urlApi.status}`
    return this._httpClient.put<Job>(url, null).pipe(
      catchError(this.handleError)
    );
  }

  updateApplicantStatus(jobId: string, applicateId: string, status: StatusRemark): Observable<string> {
    let url: string = this._baseUrl;
    url = `${url}/${jobId}/${this._asubsetUrl}/${applicateId}`
    console.log(status.jsonify());
    return this._httpClient.patch<{ message: string }>(url, status.jsonify()).pipe(
      map((response) => response.message),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400 && error.error.errors) {
      let userFriendlyErrors = [];

      for (const field in error.error.errors) {
        if (error.error.errors.hasOwnProperty(field)) {
          const firstErrorMessage = error.error.errors[field][0];
          userFriendlyErrors.push(`${field}: ${firstErrorMessage}`);
        }
      }

      const errorMessage = userFriendlyErrors.join(' | ');
      return throwError(() => new Error(errorMessage));
    }
    if (error.error.message) {
      return throwError(() => new Error(error.error.message));
    }
    console.log(error.error);
    return throwError(() => new Error('An unknown error occurred.'));
  }
}

