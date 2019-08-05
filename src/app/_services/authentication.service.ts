import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
    public userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('email'));
    public currentUser: SocialUser
    constructor(private authService: AuthService, private http: HttpClient) {
     }

    async authenticateWithGoogle(): Promise<any> { 
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user)=>  {
            
            localStorage.setItem('token', user.idToken);
            localStorage.setItem('email', user.email);
            this.userEmail.next(user.email);
            await this.http.get(`${environment.url}/auth/login`).toPromise().then(()=>this.isAuth.next(true));
            
        })
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.isAuth.next(false);
        this.userEmail.next(null);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuth.asObservable();
    }
}