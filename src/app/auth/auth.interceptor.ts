import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RouteUrls} from '../app.route-urls';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.logged) {
      req = req.clone({setHeaders: {Authorization: `Bearer ${this.auth.token}`}});
    }
    return next.handle(req).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            // TODO: test and possibly refactor this case
            // Api will return these errors
            // if there is an inconsistency in frontend and backend endpoint credentials setup
            // or if access token is broken or expired
            this.router.navigate(['/' + RouteUrls.ERROR]);
          }
        }
      }));
  }
}
