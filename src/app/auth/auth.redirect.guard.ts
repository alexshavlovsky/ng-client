import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // This guard is for public routes (login, register)
    // It redirects authenticated user to default url by role
    // If user is not authenticated then public route is activated
    return this.auth.logged ? this.auth.getDefaultRouteUrlTree(this.router) : true;
  }

}
