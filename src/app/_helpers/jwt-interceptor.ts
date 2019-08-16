import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from '../_services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private cookies: CookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.cookies.get('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}