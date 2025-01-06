import { Injectable } from '@angular/core';
import { Token } from './token';
import { environment } from '../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  #token!: Token | null;

  get token() {
    return this.#token;
  }
  set token(token: Token | null) {
    this.#token = token;
  }

  private tokenKey = environment.keys.tokenKey;

  setToken(token: Token) {
    this.#token = token;
    localStorage.setItem(this.tokenKey, token.token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null && !this.isExpiryToken();
  }

  isExpiryToken(): boolean {
    var localToken = `${this.getToken()}`;
    const userPayload: any = jwtDecode(localToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (userPayload.exp < currentTime) {
      this.clearToken();
      return true;
    }
    return false;
  }

  logout() {
    this.clearToken();
  }
}
