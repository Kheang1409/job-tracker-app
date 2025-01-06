import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = environment.application.name;
  username: string = ''

  home: string = environment.urlFrontend.home;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    if (this._authService.getToken()) {
      const token = `${this._authService.getToken()}`
      const userPayload: any = jwtDecode(token);
      this.username = userPayload.name;
    }
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
  logout() {
    this._authService.logout();
    this._router.navigate([environment.urlFrontend.signIn]);
  }
}
