import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {RouteUrls} from '../../app.route-urls';
import {HttpService} from '../../http.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  switchFrontendLink = this.http.switchFrontendHref === '' ? null : this.document.location.origin + this.http.switchFrontendHref;

  constructor(public auth: AuthService,
              @Inject(DOCUMENT) private document: any,
              private http: HttpService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logOut() {
    if (this.auth.logged) {
      this.auth.logOut();
      this.router.navigate(['/' + RouteUrls.LOGIN]);
    }
  }

}
