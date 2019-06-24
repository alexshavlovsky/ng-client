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
    // if user has multiple roles, default route will be selected
    // with priority according to the first match in this list
    {role: AuthRole.ADMIN, url: RouteUrls.USERS},
    {role: AuthRole.USER, url: RouteUrls.NOTES}
  ];
}
