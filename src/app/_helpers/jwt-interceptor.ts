import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private token: string;
    constructor(private authService: AuthenticationService) {
        this.authService.token$.subscribe(token=>this.token=token);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        return next.handle(request);
    }
}