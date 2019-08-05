import { Component, OnInit } from '@angular/core';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Observable, BehaviorSubject } from 'rxjs';
import {Location} from '@angular/common';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading = false;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route:ActivatedRoute,
    private router: Router) { 

      this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || '/';
    }

  ngOnInit() { }

  signInWithGoogle(): void {
    this.authenticationService.authenticateWithGoogle().then(() => {
      this.router.navigate([this.returnUrl])
    });
  }


}
