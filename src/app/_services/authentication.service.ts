import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);

    constructor(private authService: AuthService) { }

    authenticateWithGoogle(): Promise<any> { 
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user)=>  {
            this.isAuth.next(true);
            localStorage.setItem('token', user.idToken);
        })
    }

    signOut() {
        localStorage.removeItem('token');
        this.isAuth.next(false);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuth.asObservable();
    }
}