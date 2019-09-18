import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookies.get('token') !== '');
    public userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookies.get('email'));    
    public isAuthenticated$ = this.isAuthenticated.asObservable();
    public userEmail$ = this.userEmail.asObservable();
    public currentUser: SocialUser

    constructor(private authService: AuthService, private http: HttpClient, private cookies: CookieService) {
    }

    async authenticateWithGoogle(): Promise<any> {
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user) => {

            this.cookies.set('token', user.idToken);
            this.cookies.set('email', user.email);
            this.cookies.set('id', user.id);
            this.userEmail.next(user.email);
            await this.http.get(`${environment.url}/auth/login`).toPromise().then(() => this.isAuthenticated.next(true));
        })
    }

    signOut() {
        this.cookies.delete('token');
        this.cookies.delete('email');
        this.cookies.delete('id');
        this.isAuthenticated.next(false);
        this.userEmail.next(null);
    }
}