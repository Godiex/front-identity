export class CreateUser {
  email: string;
  password: string;
  rol: string;
  constructor(email: string, rol: string, password: string) {
    this.email = email;
    this.rol = rol;
    this.password = password;
  }
}
export class UpdatePassword {
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
