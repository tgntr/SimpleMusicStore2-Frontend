import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
    public userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('email'));
    public isAuthenticated$ = this.isAuthenticated.asObservable();
    public userEmail$ = this.userEmail.asObservable();
    public currentUser: SocialUser

    constructor(private authService: AuthService, private http: HttpClient) {
     }

    async authenticateWithGoogle(): Promise<any> { 
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user)=>  {
            
            localStorage.setItem('token', user.idToken);
            localStorage.setItem('email', user.email);
            this.userEmail.next(user.email);
            await this.http.get(`${environment.url}/auth/login`).toPromise().then(()=>this.isAuthenticated.next(true));
        })
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.isAuthenticated.next(false);
        this.userEmail.next(null);
    }
}