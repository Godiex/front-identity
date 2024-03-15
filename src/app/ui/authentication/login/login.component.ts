import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MODULES } from "../../routes.constants";
import { EmailDialogComponent } from "../email-dialog/email-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "@core/services/auth-service.interface";
import { Signature } from "@core/models/auth/signatures.model";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../../shared/services/notification.service";
import { SelectFormat } from "../../shared/components/ftx-select/models/selectFormat.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  public interCompanies: SelectFormat[] = [
    { name: "Colombia", value: "COLOMBIA" },
    { name: "Mexico", value: "MEXICO" },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}
  public loginForm!: FormGroup;
  ngOnInit(): void {
    this.interCompanies = [
      { name: "Colombia", value: "COLOMBIA" },
      { name: "Mexico", value: "MEXICO" },
    ];
    this.createForm();
  }
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      interCompanies: [""],
      email: ["", [Validators.email, Validators.required]],
      passwords: ["", Validators.required],
    });
  }
  protected showModalEmail(): void {
    this.dialog.open(EmailDialogComponent, {
      data: { email: "" },
      width: "50vh",
    });
  }
  public login(): void {
    localStorage.setItem(
      "interCompany",
      this.loginForm.get("interCompanies")?.value
    );
    const credentials = new Signature(
      this.loginForm.get("email")?.value,
      this.loginForm.get("passwords")?.value
    );
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate([MODULES.AUTHENTICATION.OTP]);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.code === 401) {
          this.notificationService.showError("Credenciales incorrectas");
        } else {
          this.notificationService.showError(
            "En estos momentos no podemos procesar su solicitud"
          );
        }
      },
    });
  }

  protected readonly MODULES = MODULES;
}
