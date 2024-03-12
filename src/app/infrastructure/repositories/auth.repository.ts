import { Injectable } from "@angular/core";
import { Signature, Token } from "@core/models/auth/signatures.model";
import { AuthService } from "@core/services/auth-service.interface";
import { environment, resources } from "@env/environment";
import { HttpService } from "@infrastructure/http/http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthRepository extends AuthService {
  baseUrl = `${environment.identityAppUrl}${environment.apiSuffix}${resources.auth}`;
  constructor(protected httpService: HttpService) {
    super();
  }

  override second_factor(code: string): Observable<Token> {
    return this.httpService.doGet<Token>(
      `${this.baseUrl}/second-factor/${code}`
    );
  }

  override login(credentials: Signature): Observable<void> {
    return this.httpService.doPost<Signature, void>(
      `${this.baseUrl}/signatures`,
      credentials
    );
  }
  override logout(id: string): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}/logout`);
  }
}
