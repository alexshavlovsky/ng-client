import {UserResponse} from '../model/user-response';

export interface AuthPrincipal {
  token: string;
  userId: string;
  exp: Date;
  roles: number;
  user: UserResponse;
}
