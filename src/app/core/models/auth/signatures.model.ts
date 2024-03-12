export class Signature {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
export class Token {
  token: string;
  acceptedTermsAndConditions: boolean;
  firstTimeLogin: boolean;
  rol: string;
  companyId: string;
  userId: string;
  constructor(
    token: string,
    acceptedTermsAndConditions: boolean,
    firstTimeLogin: boolean,
    rol: string,
    companyId: string,
    userId: string
  ) {
    this.token = token;
    this.acceptedTermsAndConditions = acceptedTermsAndConditions;
    this.firstTimeLogin = firstTimeLogin;
    this.rol = rol;
    this.companyId = companyId;
    this.userId = userId;
  }
}
