import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../shared/services/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MODULES } from "../../routes.constants";

@Component({
  selector: "app-email-dialog",
  templateUrl: "./email-dialog.component.html",
  styleUrl: "./email-dialog.component.css",
})
export class EmailDialogComponent implements OnInit {
  public email: string = "";
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { email: string }
  ) {}
  public emailForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.emailForm = this.formBuilder.group({
      email: [this.email, [Validators.email, Validators.required]],
    });
  }

  sendEmail() {
    this.notificationService.showInfo(
      "Revisa tu bandeja de entrada para continuar con el proceso."
    );
    this.dialogRef.close();
    this.router.navigate([MODULES.AUTHENTICATION.OTP]);
  }
  protected readonly MODULES = MODULES;
}
