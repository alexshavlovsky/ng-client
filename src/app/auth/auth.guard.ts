import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {RouteUrls} from '../app.route-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  // frontend authorization scheme assumes one role per component and multiple roles per user
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    // if user is not authenticated - redirect to login page
    if (!this.auth.logged) {
      return this.router.createUrlTree(['/' + RouteUrls.LOGIN]);
    }
    // if user is authorized to access the route then activate the route
    // otherwise redirect user to default route by role
    return (next.data.role && this.auth.hasRole(next.data.role)) ? true : this.auth.getDefaultRouteUrlTree(this.router);
  }

}
