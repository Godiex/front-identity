import { Token } from "@core/models/auth/signatures.model";

export abstract class SessionService {
  abstract getToken(): Token | null;
  abstract getSessionString(token: Token | null): string;
  abstract setToken(token: Token): void;
  abstract deleteToken(): void;
  abstract isLoggedIn(): boolean;
}
