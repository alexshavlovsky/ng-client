import {AuthRole} from './auth/auth-role.enum';

export class RouteUrls {
  public static REGISTER = 'register';
  public static LOGIN = 'login';
  public static NOTES = 'notes';
  public static FEEDBACK = 'feedback';
  public static USERS = 'users';
  public static COMMANDS = 'commands';
  public static DEFAULT_BY_ROLE = [
    {role: AuthRole.USER, route: RouteUrls.NOTES},
    {role: AuthRole.ADMIN, route: RouteUrls.COMMANDS}
  ];
}
