import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getAuthToken();
        if (token) {
            // If we have a token, we set it to the header
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {

                if (err instanceof HttpErrorResponse && err.status === 401) {
                    localStorage.clear();
                    this.router.navigate(['/']);
                    alert('Unauthorised');
                }
                throw err;
            }),
            
        );
    }
}
