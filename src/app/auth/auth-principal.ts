export interface AuthPrincipal {
  token: string;
  userId: string;
  exp: Date;
  // multiple user roles are packed into one integer number
  // each bit corresponds to a specific user role
  roles: number;
}
