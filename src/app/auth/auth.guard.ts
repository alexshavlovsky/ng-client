import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {RouteUrls} from '../app.route-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if user is not authenticated - redirect to login page
    if (!this.auth.logged) {
      return this.router.createUrlTree(['/' + RouteUrls.LOGIN]);
    }
    // if user is authorised to access the route - activate the route
    if (next.data.role && this.auth.hasRole(next.data.role)) {
      return true;
    }
    // redirect to default route by role
    const route = RouteUrls.DEFAULT_BY_ROLE.find(r => this.auth.hasRole(r.role)).route;
    return route === undefined ? false : this.router.createUrlTree(['/' + route]);
  }

}
