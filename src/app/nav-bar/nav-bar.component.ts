import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private http: HttpService,
              private toast: ToastrService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  sendCommandShutdown() {
    if (!confirm('Are you sure you want to shutdown the backend app? Your database connection will be lost!')) {
      return;
    }
    this.toast.warning('Sending shutdown command...');
    this.http.postCommand('shutdown').subscribe();
  }

  sendCommandFillDb() {
    if (!confirm('Are you sure you want to fill the database with random data?')) {
      return;
    }
    this.http.postCommand('fill database').subscribe(
      res => {
        this.toast.success(res.message);
        location.reload();
      },
      () => this.toast.error('Failed to fill database')
    );
  }

  logOut() {
    if (this.auth.logged) {
      this.auth.logOut();
      this.router.navigate(['/login']);
    }
  }

}
