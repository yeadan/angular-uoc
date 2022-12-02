export class User {
  id?: number;
  name: string;
  email: string;
  admin?: boolean;
  password: string;
  active?: boolean;
  rememberToken?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(name: string, email: string, admin: boolean, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
