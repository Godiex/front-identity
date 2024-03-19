import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MODULES } from "../../routes.constants";
import { UserService } from "@core/services/user-service.interface";
import { SessionService } from "@core/services/session-service.interface";
import { Token } from "@core/models/auth/signatures.model";
import { environment } from "@env/environment";
import { UserType } from "@core/enums/userType.enum";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: "app-terms-and-conditions",
  templateUrl: "./terms-and-conditions.component.html",
  styleUrl: "./terms-and-conditions.component.css",
})
export class TermsAndConditionsComponent {
  acceptedTerms: boolean = false;
  token!: Token | null;
  public isLoading = false;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
  onContinue() {
    if (!this.acceptedTerms) {
      return;
    }
    this.token = this.sessionService.getToken();
    if (!this.token) {
      this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
      return;
    }
    this.isLoading = true;
    this.userService.AcceptTermsAndConditions().subscribe({
      next: () => {
        this.isLoading = false;
        if (this.token?.firstTimeLogin) {
          this.redirectToUpdatePassword();
        } else {
          this.redirectBasedOnUserRole(this.token);
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private redirectToUpdatePassword(): void {
    this.notificationService.showInfo(
      "En este momento debe actualizar su contraseña para poder continuar."
    );
    this.router.navigate([MODULES.AUTHENTICATION.UPDATEPASSWORD]);
  }

  onReject() {
    this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
  }

  private redirectBasedOnUserRole(token: Token | null): void {
    if (!token) {
      return;
    }
    const sessionString = this.sessionService.getSessionString(token);
    const redirectUrl =
      token.rol === UserType.SuperAdmin
        ? `${environment.frontAdminUrl}${environment.negotiation}${sessionString}`
        : `${environment.frontCustomerUrl}${environment.negotiation}${sessionString}`;
    window.location.href = redirectUrl;
  }

  protected readonly MODULES = MODULES;
}
