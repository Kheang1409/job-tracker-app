import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = environment.application.name;
  home: string = environment.urlFrontend.home;
  signIn: string = environment.urlFrontend.signIn;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    console.log('hi');
    console.log(`isExpiryToken(): ${this._authService.isExpiryToken()}`);
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }
  logout() {
    this._authService.logout();
    this._router.navigate([this.signIn]);
  }
}
