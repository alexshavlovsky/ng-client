export class UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: number;

  public constructor(init?: Partial<UserResponse>) {
    Object.assign(this, init);
  }
}
