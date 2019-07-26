import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.authState.subscribe((user) => {
            if (user) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${user.idToken}`
                    }
                });
            }
        });

        return next.handle(request);
    }
}