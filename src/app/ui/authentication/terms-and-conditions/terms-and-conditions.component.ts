import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MODULES } from "../../routes.constants";
import { UserService } from "@core/services/user-service.interface";
import { SessionService } from "@core/services/session-service.interface";
import { Token } from "@core/models/auth/signatures.model";
import { environment } from "@env/environment";

@Component({
  selector: "app-terms-and-conditions",
  templateUrl: "./terms-and-conditions.component.html",
  styleUrl: "./terms-and-conditions.component.css",
})
export class TermsAndConditionsComponent {
  acceptedTerms: boolean = false;
  token!: Token | null;
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) {}
  onContinue() {
    if (this.acceptedTerms) {
      this.token = this.sessionService.getToken();
      if (this.token) {
        this.userService.AcceptTermsAndConditions().subscribe({
          next: () => {
            if (this.token?.firstTimeLogin) {
              this.router.navigate([MODULES.AUTHENTICATION.UPDATEPASSWORD]);
            } else {
              const sessionString = this.sessionService.getSessionString(
                this.token
              );
              if (this.token?.rol === "SuperAdmin") {
                window.location.href = `${environment.frontAdminUrl}${environment.negotiation}${sessionString}`;
              } else {
                window.location.href = `${environment.frontCustomerUrl}${environment.negotiation}${sessionString}`;
              }
            }
          },
          error: () => {},
        });
      }
    }
  }

  onReject() {
    this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
  }
  protected readonly MODULES = MODULES;
}
