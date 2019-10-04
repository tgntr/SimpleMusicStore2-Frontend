import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    claimRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    constructor(
        private router: Router,
        private cookies: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.cookies.get('token');
        let claims = new JwtHelperService().decodeToken(token);
        if (claims && claims[this.claimRole] === 'Admin') {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}