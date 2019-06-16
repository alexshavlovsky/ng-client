import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthPrincipal} from './auth-principal';
import {AuthRole} from './auth-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService();

  principal: AuthPrincipal = null;

  private updatePrincipal(token: string) {
    if (this.principal === null || this.principal.token !== token) {
      const decoded = this.helper.decodeToken(token);
      this.principal = {
        token,
        userId: decoded.sub,
        exp: this.helper.getTokenExpirationDate(token),
        roles: decoded.roles
      };
      console.log(this.principal);
    }
  }

  private removeToken() {
    this.principal = null;
    localStorage.removeItem('token');
  }

  private setToken(token: string) {
    this.updatePrincipal(token);
    return localStorage.setItem('token', token);
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
