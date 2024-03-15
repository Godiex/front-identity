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
  confirmpassword: string;
  constructor(password: string, confirmpassword: string) {
    this.password = password;
    this.confirmpassword = confirmpassword;
  }
}
