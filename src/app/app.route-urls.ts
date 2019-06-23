import {AuthRole} from './auth/auth-role.enum';

export class RouteUrls {
  public static REGISTER = 'register';
  public static LOGIN = 'login';
  public static NOTES = 'notes';
  public static FEEDBACK = 'feedback';
  public static USERS = 'users';
  public static COMMANDS = 'commands';
  public static ERROR = 'error';
  public static DEFAULT_BY_ROLE = [
    {role: AuthRole.USER, url: RouteUrls.NOTES},
    {role: AuthRole.ADMIN, url: RouteUrls.USERS}
  ];
}
