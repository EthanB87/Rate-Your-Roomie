export class Account {
  email: string | null | undefined;
  password: string | null | undefined;

  constructor(email: string | null | undefined, password: string | null | undefined) {
    this.email = email;
    this.password= password;
  }
}
