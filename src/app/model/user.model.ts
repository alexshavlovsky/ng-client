export class UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
