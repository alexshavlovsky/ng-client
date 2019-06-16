import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthPrincipal} from './auth-principal';
import {AuthRole} from './auth-role.enum';
import {UserResponse} from '../model/user-response';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: HttpService) {
  }

  private helper = new JwtHelperService();

  private principal: AuthPrincipal = null;
  public user: UserResponse = null;

  private updatePrincipal(token: string) {
    if (this.principal === null || this.principal.token !== token) {
      const decoded = this.helper.decodeToken(token);
      const exp = this.helper.getTokenExpirationDate(token);
      this.principal = {token, userId: decoded.sub, exp, roles: decoded.roles};
      if (this.user === null) {
        this.fetchUser(token);
      }
    }
  }

  private fetchUser(token: string) {
    this.api.getCurrentUser().subscribe(
      res => {
        if (this.principal && this.principal.token === token) {
          this.user = new UserResponse(res);
        }
      },
      () => this.removeToken()
    );
  }

  private removeToken() {
    localStorage.removeItem('token');
    this.principal = null;
    this.user = null;
  }

  private setToken(token: string, user: UserResponse) {
    localStorage.setItem('token', token);
    this.user = user;
    this.updatePrincipal(token);
  }

  public get token(): string {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.removeToken();
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

  public logIn(token: string, user: UserResponse) {
    this.setToken(token, user);
  }

  public logOut() {
    this.removeToken();
  }

  public hasRole(role: AuthRole): boolean {
    /* tslint:disable:no-bitwise */
    return this.logged ? ((role & this.principal.roles) !== 0) : false;
    /* tslint:enable:no-bitwise */
  }

  get displayName(): string {
    return this.logged && this.user ? this.user.firstName + ' ' + this.user.lastName : null;
  }

  get hasAdminRole(): boolean {
    return this.hasRole(AuthRole.ADMIN);
  }

}
