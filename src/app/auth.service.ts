import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public get header(): string {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  public get loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logIn(token: string) {
    return localStorage.setItem('token', token);
  }

  public logOut() {
    localStorage.removeItem('token');
  }

}
