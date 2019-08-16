import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from '../_services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private cookies: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.cookies.get('token')) {
            return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}