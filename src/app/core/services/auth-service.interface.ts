import { Observable } from "rxjs";
import { Signature, Token } from "@core/models/auth/signatures.model";

export abstract class AuthService {
  abstract login(credentials: Signature): Observable<void>;
  abstract second_factor(code: string): Observable<Token>;
  abstract logout(id: string): Observable<void>;
}
