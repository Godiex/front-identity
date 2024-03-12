import { Token } from "@core/models/auth/signatures.model";
import { SessionService } from "@core/services/session-service.interface";

export class SessionRepository extends SessionService {
  override isLoggedIn(): boolean {
    return Object.entries(this.getToken()?.token || "").length !== 0;
  }
  override getToken(): Token | null {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      return new Token(
        tokenData.token,
        tokenData.acceptedTermsAndConditions,
        tokenData.firstTimeLogin,
        tokenData.rol,
        tokenData.companyId,
        tokenData.userId
      );
    }

    return null;
  }

  override getSessionString(token: Token): string {
    let sessionString = `?session=%7B"token":"${token.token}","acceptedTermsAndConditions":${token.acceptedTermsAndConditions},"firstTimeLogin":${token.firstTimeLogin},"rol":"${token.rol}","companyId":"${token.companyId}","userId":"${token.userId}"%7D`;
    return sessionString;
  }
  override setToken(token: Token): void {
    localStorage.setItem("token", JSON.stringify(token));
  }
  override deleteToken(): void {
    localStorage.removeItem("token");
  }
}
