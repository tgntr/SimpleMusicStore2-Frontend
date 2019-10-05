import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private claimId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    private claimEmail = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    private claimRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookies.get('token') !== '');
    private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookies.get('token') !== '' && new JwtHelperService().decodeToken(this.cookies.get('token'))[this.claimRole] === 'Admin');
    public userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookies.get('email'));
    public isAuthenticated$ = this.isAuthenticated.asObservable();
    public userEmail$ = this.userEmail.asObservable();
    public isAdmin$ = this.isAdmin.asObservable();
    


    constructor(private authService: AuthService, private http: HttpClient, private cookies: CookieService) {
    }

    async authenticateWithGoogle(): Promise<any> {
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (user) => {
            await this.http.get(`${environment.url}/auth/google?token=${user.idToken}`, {responseType: 'text'}).toPromise().then(token => {
                this.isAuthenticated.next(true);
                this.cookies.set('token', token);
                const claims = new JwtHelperService().decodeToken(token);
                this.cookies.set('email', claims[this.claimEmail]);
                this.cookies.set('id', claims[this.claimId]);
                this.userEmail.next(claims[this.claimEmail]);
                this.isAdmin.next(claims[this.claimRole] === 'Admin');
            });
        })
    }

    signOut() {
        debugger;
        this.cookies.delete('token');
        this.cookies.delete('email');
        this.cookies.delete('id');
        this.isAuthenticated.next(false);
        this.userEmail.next(null);
        this.isAdmin.next(false);
    }
}