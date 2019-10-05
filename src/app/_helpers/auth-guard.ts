import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private isAuthenticated:boolean = false;
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.authService.isAuthenticated$.subscribe(isAuthenticated=>this.isAuthenticated = isAuthenticated);
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.isAuthenticated) {
            return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}