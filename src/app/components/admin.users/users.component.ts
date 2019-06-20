import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ToastrService} from 'ngx-toastr';
import {UserResponse} from '../../model/user-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpService,
              private toast: ToastrService) {
  }

  users: UserResponse[] = [];

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.getAllUsers().subscribe(
      res => {
        this.users = res.map(dto => new UserResponse(dto));
      },
      err => {
        this.toast.error('Failed to get users');
      }
    );
  }

}
