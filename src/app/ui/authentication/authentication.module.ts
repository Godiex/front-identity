import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { HttpService } from "@infrastructure/http/http.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login/login.component";
import { UpdatepasswordComponent } from "./updatepassword/updatepassword.component";
import { EmailDialogComponent } from "./email-dialog/email-dialog.component";
import { NgOtpInputModule } from "ng-otp-input";
import { AuthotpComponent } from "./authotp/authotp.component";
import { AuthService } from "@core/services/auth-service.interface";
import { AuthRepository } from "@infrastructure/repositories/auth.repository";
import { SessionService } from "@core/services/session-service.interface";
import { SessionRepository } from "@infrastructure/repositories/session.repository";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { UserService } from "@core/services/user-service.interface";
import { UserRepository } from "@infrastructure/repositories/user.repository";

@NgModule({
  declarations: [
    LoginComponent,
    UpdatepasswordComponent,
    EmailDialogComponent,
    AuthotpComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    HttpService,

    { provide: AuthService, useClass: AuthRepository },
    { provide: UserService, useClass: UserRepository },
    { provide: SessionService, useClass: SessionRepository },
  ],
  bootstrap: [AuthotpComponent],
})
export class AuthenticationModule {}
