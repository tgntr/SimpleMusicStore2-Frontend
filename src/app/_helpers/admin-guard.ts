import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    claimRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    isAdmin:boolean = false;
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.authService.isAdmin$.subscribe(isAdmin=>this.isAdmin = isAdmin);
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAdmin) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}