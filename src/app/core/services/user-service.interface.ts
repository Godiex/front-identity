import {
  CreateUser,
  UpdatePassword,
} from "@core/models/user/create-user.model";
import { Observable } from "rxjs";

export abstract class UserService {
  abstract createUser(user: CreateUser): Observable<void>;
  abstract getAll(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<any>;

  abstract putCreateUser(userId: string, user: CreateUser): Observable<void>;
  abstract updatePassword(
    userId: string,
    password: UpdatePassword
  ): Observable<void>;
  abstract AcceptTermsAndConditions(userId: string): Observable<void>;
}
