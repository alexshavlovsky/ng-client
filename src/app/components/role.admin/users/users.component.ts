import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../http.service';
import {ToastrService} from 'ngx-toastr';
import {UserResponse} from '../../../model/user-response';
import {AuthRole} from '../../../auth/auth-role.enum';

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

  rolesToString(mask: number): string {
    /* tslint:disable:no-bitwise */
    return Object.keys(AuthRole).filter((key) => ((AuthRole[key] & mask) !== 0)).join(', ');
    /* tslint:enable:no-bitwise */
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.getAllUsers().subscribe(
      res => this.users = res.map(dto => new UserResponse(dto))
      ,
      () => this.toast.error('Failed to get users')
    );
  }

}
