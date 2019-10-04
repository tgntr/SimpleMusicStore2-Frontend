import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class NotAuthenticated implements CanActivate {
    constructor(
        private router: Router,
        private cookies: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.cookies.get('token')) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}