import { Routes } from "@angular/router";
import { AUTHENTICATION } from "./routes.constants";

export const routes: Routes = [
  {
    path: AUTHENTICATION.NAME,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
];
