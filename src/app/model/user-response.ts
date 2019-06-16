export class UserResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;

  public constructor(init?: Partial<UserResponse>) {
    Object.assign(this, init);
  }
}
