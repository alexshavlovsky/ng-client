import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthPrincipal} from './auth-principal';
import {AuthRole} from './auth-role.enum';
import {UserResponse} from '../model/user-response';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: HttpService, private toast: ToastrService) {
  }

  private helper = new JwtHelperService();

  principal: AuthPrincipal = null;

  private updatePrincipal(token: string) {
    if (this.principal === null || this.principal.token !== token) {
      const decoded = this.helper.decodeToken(token);
      const exp = this.helper.getTokenExpirationDate(token);
      this.principal = {
        token,
        userId: decoded.sub,
        exp,
        roles: decoded.roles,
        user: null
      };
      this.api.getCurrentUser().subscribe(
        res => {
          if (this.principal && this.principal.token === token) {
            this.principal.user = new UserResponse(res);
            this.toast.success('Hi, ' + this.principal.user.firstName);
          }
        },

        err => {
          this.removeToken();
          const msg = err.error.message ? err.error.message : 'Authorization error';
          this.toast.error(msg);
        });
    }
  }

  private removeToken() {
    localStorage.removeItem('token');
    this.principal = null;
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.updatePrincipal(token);
  }

  public get token(): string {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.principal = null;
      return null;
    }
    this.updatePrincipal(token);
    if (this.principal.exp < new Date()) {
      this.removeToken();
      return null;
    }
    return token;
  }

  public get logged(): boolean {
    return this.token !== null;
  }

  public logIn(token: string) {
    this.setToken(token);
  }

  public logOut() {
    this.removeToken();
  }

  public hasRole(role: AuthRole): boolean {
    /* tslint:disable:no-bitwise */
    return this.logged ? ((role & this.principal.roles) !== 0) : false;
  }

}
