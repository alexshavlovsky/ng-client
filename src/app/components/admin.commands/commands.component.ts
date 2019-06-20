import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  constructor(private http: HttpService, private toast: ToastrService) {
  }

  ngOnInit() {
  }

  sendShutdown() {
    if (confirm('Are you sure you want to shutdown the backend app? Your database connection will be lost!')) {
      this.toast.warning('Sending shutdown command...');
      this.http.postCommand('shutdown').subscribe();
    }
  }

  sendFillDatabase() {
    if (confirm('Are you sure you want to fill the database with random data?')) {
      this.http.postCommand('fill database').subscribe(
        res => this.toast.success(res.message),
        () => this.toast.error('Failed to fill database')
      );
    }
  }

}
