import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService.authState.subscribe((user) => {
            debugger;
            if (user) {
                return true;
            }
        });

        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}