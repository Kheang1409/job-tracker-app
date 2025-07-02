import { Injectable } from '@angular/core';
import { Token } from '../classes/token';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { handler } from '../untils/error-handler-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.api.baseUrl;
  private _auth = environment.api.auth;
  private _tokenKey = environment.keys.tokenKey;
  private _resetPasswordToken = environment.keys.resetPasswordToken;

  private _loginState!: BehaviorSubject<boolean>;
  public loginState$!: Observable<boolean>;

  constructor(
    private _httpClient: HttpClient
  ) { 
    const isLogged = this._isLoggedIn();  // Safe internal method
    this._loginState = new BehaviorSubject<boolean>(isLogged);
    this.loginState$ = this._loginState.asObservable();
  }

  login(email: string, password: string): Observable<Token> {
    const url: string = `${this._baseUrl}/${this._auth.base}/${this._auth.login}`;
    return this._httpClient.post<Token>(url, { email, password }).pipe(
      catchError(handler)
    );
  }

  forgotPassword(email: string): Observable<Token> {
    const url: string = `${this._baseUrl}/${this._auth.base}/${this._auth.forgotPassword}`;
    return this._httpClient.post<Token>(url, { email }).pipe(
      catchError(handler)
    );
  }

  resetPassword(otp: string, password: string): Observable<void> {
    const url: string = `${this._baseUrl}/${this._auth.base}/${this._auth.resetPassword}`;
    return this._httpClient.post<void>(url, { otp, password }).pipe(
      catchError(handler)
    );
  }

  logout() {
    this._clearToken();
    this._loginState.next(false);
  }

  setToken(token: string) {
    localStorage.setItem(this._tokenKey, token);
    this._loginState.next(true);
  }

  setResetPasswordToken(token: string) {
    localStorage.setItem(this._resetPasswordToken, token);
    this._loginState.next(true);
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  private _isLoggedIn(): boolean {
    const token = this._getToken();
    return token !== null && !this._isExpiryToken(token);
  }

  userId(): string {
    const token = this._getToken();
    if (!token) return '';
    const userPayload: any = jwtDecode(token);
    return userPayload?.sub || '';
  }

  private _isExpiryToken(token: string): boolean {
    try {
      const userPayload: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (userPayload?.exp && userPayload.exp < currentTime) {
        this._clearToken();
        if (this._loginState) {
          this._loginState.next(false);
        }
        return true;
      }
      return false;
    } catch (error) {
      // console.warn('Invalid token format:', error);
      this._clearToken();
      if (this._loginState) {
        this._loginState.next(false);
      }
      return true;
    }
  }

  private _getToken(): string | null {
    return localStorage.getItem(this._tokenKey);
  }

  private _clearToken() {
    localStorage.removeItem(this._tokenKey);
  }
}