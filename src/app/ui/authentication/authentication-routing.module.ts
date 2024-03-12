import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AUTHENTICATION } from "../routes.constants";
import { LoginComponent } from "./login/login.component";
import { UpdatepasswordComponent } from "./updatepassword/updatepassword.component";
import { AuthotpComponent } from "./authotp/authotp.component";
import { sessionGuard } from "@infrastructure/session.guard";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";

const routes: Routes = [
  {
    path: AUTHENTICATION.LOGIN,
    component: LoginComponent,
  },
  {
    path: AUTHENTICATION.UPDATE_PASSWORD,
    component: UpdatepasswordComponent,
  },
  {
    path: AUTHENTICATION.OTP,
    component: AuthotpComponent,
  },
  {
    path: AUTHENTICATION.TERMS_AND_CONDITIONS,
    component: TermsAndConditionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
