import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './job';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  private _baseUrl = 'http://localhost:5002/api/jobs';

  constructor(private _httpClient: HttpClient) { }

  getRestaurants(pageNumber: number): Observable<Job[]> {
    let url: string = this._baseUrl
    url = `${url}?${environment.urlApi.query.pageNumber}=${pageNumber}`
    return this._httpClient.get<Job[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getTotalRestaurants(name: string | null): Observable<number> {
    let url: string = `${this._baseUrl}/${environment.urlApi.total}`;
    if (name && name !== '') {
      url = `${url}?${environment.urlApi.query.name}=${name}`
    }
    return this._httpClient.get<number>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError({ message: error.error.message });
  }
}

