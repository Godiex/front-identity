export class User {
  Name: string;
  Document: string;
  Email: string;
  Rol: string;

  constructor(name: string, document: string, email: string, rol: string) {
    this.Name = name;
    this.Document = document;
    this.Email = email;
    this.Rol = rol;
  }
}
