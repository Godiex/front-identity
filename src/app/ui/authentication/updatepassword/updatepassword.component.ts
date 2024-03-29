import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UpdatePassword } from "@core/models/user/create-user.model";
import { UserService } from "@core/services/user-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { MODULES } from "../../routes.constants";
import { SessionService } from "@core/services/session-service.interface";
import { Token } from "@core/models/auth/signatures.model";
import { environment } from "@env/environment";
import { UserType } from "@core/enums/userType.enum";

@Component({
  selector: "app-updatepassword",
  templateUrl: "./updatepassword.component.html",
  styleUrl: "./updatepassword.component.css",
})
export class UpdatepasswordComponent implements OnInit {
  token!: Token | null;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) {}
  public updatePasswordForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.updatePasswordForm = this.formBuilder.group(
      {
        newpassword: ["", [Validators.required]],
        confirmnewpassword: ["", Validators.required],
      },
      {
        validators: this.matchValidator("newpassword", "confirmnewpassword"),
      }
    );
  }

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.["confirmedValidator"]
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: "Passwords do not match." };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  public update(): void {
    this.token = this.sessionService.getToken();
    if (!this.token) {
      this.router.navigate([MODULES.AUTHENTICATION.LOGIN]);
      return;
    }
    this.isLoading = true;

    var password = this.updatePasswordForm.get("newpassword")?.value;
    var confirmnewpassword =
      this.updatePasswordForm.get("confirmnewpassword")?.value;

    if (!password || !confirmnewpassword) {
      return;
    }

    this.userService
      .updatePassword(new UpdatePassword(password, confirmnewpassword))
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.notificationService.showSuccess(
            "Contraseña actualizada con éxito"
          );

          this.redirectBasedOnUserRole(this.token);
        },
        error: () => {
          this.isLoading = false;
        },
      });
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

  readonly MODULES = MODULES;
}
