import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isDropdownOpen = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);
  isLoggedIn = signal<boolean>(false);

  private _loginStateSubscription!: Subscription;
  
  ngOnInit(): void {
    this.isDropdownOpen.set(false);
    this.isMobileMenuOpen.set(false);
    this._loginStateSubscription = this._authService.loginState$.subscribe(isLoggedIn => {
      this.isLoggedIn.set(isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    if (this._loginStateSubscription) {
      this._loginStateSubscription.unsubscribe();
    }
  }

  constructor(
    private _authService: AuthService,
    private _router: Router

  ) {

  }


  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
  login() {
    this._router.navigate(['/login']);
  }
  logout(){
    this._authService.logout();
  }
}
