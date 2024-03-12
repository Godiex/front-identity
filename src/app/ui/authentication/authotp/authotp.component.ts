import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { MODULES } from "../../routes.constants";
import { Token } from "@core/models/auth/signatures.model";
import { SessionService } from "@core/services/session-service.interface";
import { environment } from "@env/environment";

@Component({
  selector: "app-authotp",
  templateUrl: "./authotp.component.html",
  styleUrl: "./authotp.component.css",
})
export class AuthotpComponent {
  public otp!: string;
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
    if (this.otpValidToSend) {
      this.authService.second_factor(this.otp).subscribe({
        next: (response: Token) => {
          debugger;
          this.notificationService.showSuccess("Código verificado con éxito");
          if (!response.acceptedTermsAndConditions) {
            this.router.navigate([MODULES.AUTHENTICATION.TERMS_AND_CONDITIONS]);
          } else if (response.firstTimeLogin) {
            this.notificationService.showInfo(
              "En este momento debe actualizar su contraseña para poder continuar."
            );
            this.router.navigate([MODULES.AUTHENTICATION.UPDATEPASSWORD]);
          } else {
            const sessionString =
              this.sessionService.getSessionString(response);
            if (response.rol === "SuperAdmin") {
              window.location.href = `${environment.frontAdminUrl}${environment.negotiation}${sessionString}`;
            } else {
              window.location.href = `${environment.frontCustomerUrl}${environment.negotiation}${sessionString}`;
            }
          }
          this.sessionService.setToken(response);
        },
        error: (error) => {
          this.notificationService.showError("Código incorrecto");
          this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
        },
      });
    }
  }
  protected readonly MODULES = MODULES;
}
