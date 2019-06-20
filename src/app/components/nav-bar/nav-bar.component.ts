import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logOut() {
    if (this.auth.logged) {
      this.auth.logOut();
      this.router.navigate(['/login']);
    }
  }

}
