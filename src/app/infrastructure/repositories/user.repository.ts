import { Injectable } from "@angular/core";
import {
  CreateUser,
  UpdatePassword,
} from "@core/models/user/create-user.model";
import { UserService } from "@core/services/user-service.interface";
import { environment, resources } from "@env/environment";
import { HttpService } from "@infrastructure/http/http.service";
import { Observable, concatMap, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserRepository extends UserService {
  baseUrl = `${environment.identityAppUrl}${environment.apiSuffix}${resources.user}`;

  override updatePassword(password: UpdatePassword): Observable<void> {
    return this.httpService.doPatch<UpdatePassword, void>(
      `${this.baseUrl}/update-password`,
      password
    );
  }
  override AcceptTermsAndConditions(): Observable<void> {
    return this.httpService.doPatch<null, void>(
      `${this.baseUrl}/accepttermsandconditions`,
      null
    );
  }
  constructor(protected httpService: HttpService) {
    super();
  }
  override createUser(user: CreateUser): Observable<void> {
    return this.postCreateUserId().pipe(
      concatMap((userId) => this.putCreateUser(userId, user))
    );
  }
  private postCreateUserId(): Observable<string> {
    return this.httpService
      .doPost<null, { userId: string }>(this.baseUrl, null)
      .pipe(map((result) => result.userId));
  }
  override putCreateUser(userId: string, user: CreateUser): Observable<void> {
    return this.httpService.doPut<CreateUser, void>(
      `${this.baseUrl}/${userId}`,
      user
    );
  }
  override getAll(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<any> {
    throw new Error("Method not implemented.");
  }
}
