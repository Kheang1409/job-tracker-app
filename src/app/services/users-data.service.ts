import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable  } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../classes/user';
import { handler } from '../untils/error-handler-utils';


@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private _baseUrl = environment.api.baseUrl;
  private _users = environment.api.users;


  constructor(
    private _httpClient: HttpClient
  ) { }

  getUserProfile(): Observable<User> {
    const url: string = `${this._baseUrl}/${this._users.base}/${this._users.me}`;
    return this._httpClient.get<User>(url).pipe(
      catchError(handler)
    );
  }

  updateUserProfile(user: any): Observable<void>{
    const url: string = `${this._baseUrl}/${this._users.base}/${this._users.me}`;
    return this._httpClient.put<void>(url, user).pipe(
      catchError(handler)
    );
  }
  createUser(user: User): Observable<User> {
    const url: string = `${this._baseUrl}/${this._users.base}`;
    return this._httpClient.post<User>(url, user).pipe(
      catchError(handler)
    );
  }
}
