import { CanActivateFn } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { SessionService } from "@core/services/session-service.interface";
import { MODULES } from "../ui/routes.constants";

export const sessionGuard: CanActivateFn = (route, state) => {
  const service = inject(SessionService);

  if (state.url === MODULES.AUTHENTICATION.LOGIN) {
    return !service.isLoggedIn();
  } else {
    return service.isLoggedIn();
  }
};
