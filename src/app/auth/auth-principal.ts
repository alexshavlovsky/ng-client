export interface AuthPrincipal {
  token: string;
  userId: string;
  exp: Date;
  roles: number;
}
