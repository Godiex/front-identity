import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { MODULES } from "../../routes.constants";
import { Token } from "@core/models/auth/signatures.model";
import { SessionService } from "@core/services/session-service.interface";
import { environment } from "@env/environment";
import { UserType } from "@core/enums/userType.enum";

@Component({
  selector: "app-authotp",
  templateUrl: "./authotp.component.html",
  styleUrl: "./authotp.component.css",
})
export class AuthotpComponent {
  public otp!: string;
  public isLoading = false;

  public otpValidToSend: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {}
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "40px",
      height: "40px",
    },
  };

  onOtpChange(otp: string) {
    this.otp = otp;
    this.otpValidToSend = this.otp.length === 6;
  }

  public verifyOtp(): void {
    if (!this.otpValidToSend) {
      return;
    }
    this.isLoading = true;

    this.authService.second_factor(this.otp).subscribe({
      next: (response: Token) => {
        this.isLoading = false;

        this.notificationService.showSuccess("Código verificado con éxito");

        if (!response.acceptedTermsAndConditions) {
          this.redirectToTermsAndConditions();
        } else if (response.firstTimeLogin) {
          this.redirectToUpdatePassword();
        } else {
          this.redirectBasedOnUserRole(response);
        }

        this.sessionService.setToken(response);
      },
      error: (error) => {
        this.isLoading = false;

        this.handleInvalidOtp();
      },
    });
  }
  private redirectToTermsAndConditions(): void {
    this.router.navigate([MODULES.AUTHENTICATION.TERMS_AND_CONDITIONS]);
  }

  private redirectToUpdatePassword(): void {
    this.notificationService.showInfo(
      "En este momento debe actualizar su contraseña para poder continuar."
    );
    this.router.navigate([MODULES.AUTHENTICATION.UPDATEPASSWORD]);
  }

  private redirectBasedOnUserRole(response: Token): void {
    const sessionString = this.sessionService.getSessionString(response);
    const redirectUrl =
      response.rol === UserType.SuperAdmin
        ? `${environment.frontAdminUrl}${environment.negotiation}${sessionString}`
        : `${environment.frontCustomerUrl}${environment.negotiation}${sessionString}`;
    window.location.href = redirectUrl;
  }

  private handleInvalidOtp(): void {
    this.notificationService.showError("Código incorrecto");
    this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
  }
  protected readonly MODULES = MODULES;
}
