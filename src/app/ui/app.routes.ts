import { Routes } from "@angular/router";
import { AUTHENTICATION } from "./routes.constants";
import { SessionRepository } from "@infrastructure/repositories/session.repository";

export const routes: Routes = [
  {
    path: "",
    redirectTo: `${AUTHENTICATION.NAME}/${AUTHENTICATION.LOGIN}`,
    pathMatch: "full",
  },
  {
    path: AUTHENTICATION.NAME,
    providers: [SessionRepository],
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
];
