export class LoginModel {
  email: string;
  password: string;

  public constructor(init?: Partial<LoginModel>) {
    Object.assign(this, init);
  }
}
