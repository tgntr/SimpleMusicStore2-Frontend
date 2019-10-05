import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private claimId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    private claimEmail = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    private claimRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    private currentUserToken: string = this.cookies.get('token');
    private jwtDecoder = new JwtHelperService();
    private claims = this.jwtDecoder.decodeToken(this.currentUserToken);
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.claims !== null);
    private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isCurrentUserAdmin());
    private userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookies.get('email'));
    private token: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentUserToken);
    public isAuthenticated$ = this.isAuthenticated.asObservable();
    public userEmail$ = this.userEmail.asObservable();
    public isAdmin$ = this.isAdmin.asObservable();
    public token$ = this.token.asObservable();
    


    constructor(private authService: AuthService, private http: HttpClient, private cookies: CookieService) {
    }

    async authenticateWithGoogle(): Promise<any> {
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user) => {
            await this.http.get(`${environment.url}/auth/google?token=${user.idToken}`, {responseType: 'text'}).toPromise().then(token => {
                this.isAuthenticated.next(true);
                this.cookies.set('token', token);
                this.claims = this.jwtDecoder.decodeToken(token);
                this.cookies.set('email', this.claims[this.claimEmail]);
                this.cookies.set('id', this.claims[this.claimId]);
                this.userEmail.next(this.claims[this.claimEmail]);
                this.isAdmin.next(this.isCurrentUserAdmin());
                this.token.next(token);
            });
        })
    }

    signOut() {
        this.cookies.delete('token');
        this.cookies.delete('email');
        this.cookies.delete('id');
        this.isAuthenticated.next(false);
        this.userEmail.next(null);
        this.isAdmin.next(false);
        this.token.next(null);
    }

    private isCurrentUserAdmin(): boolean {
        return this.claims && this.claims[this.claimRole] === 'Admin'
    }
}