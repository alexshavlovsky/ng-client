import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {RouteUrls} from '../app.route-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Only authenticated user can reach this guard
    // Not authenticated user will be redirected to login page by http interceptor
    // This guard redirects user to default route by role
    if (this.auth.logged) {
      const route = RouteUrls.DEFAULT_BY_ROLE.find(r => this.auth.hasRole(r.role)).route;
      return route === undefined ?
        true // the route to activate should point to the error component
        :
        this.router.createUrlTree(['/' + route]);
    }
    return true; // the route to activate should point to the error component
  }

}
