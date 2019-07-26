import { Component, OnInit } from '@angular/core';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading = false;

  user: SocialUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loading = true;
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loading = false;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signOut(): void {
    this.authService.signOut();
  }


}
