import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authLoading = false;
  isAuthenticated = false;
  isAdmin = false;
  currentEmail: string;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authLoading = true;
    this.authService.isAuthenticated$.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.authService.userEmail$.subscribe(name=>this.currentEmail = name);
    this.authService.isAdmin$.subscribe(isAdmin=>this.isAdmin = isAdmin);
    this.authLoading = false;
  };


  signOut() {
    debugger;
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
