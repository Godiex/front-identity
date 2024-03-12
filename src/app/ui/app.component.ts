import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { MODULES } from "./routes.constants";
import { MatSidenav } from "@angular/material/sidenav";

interface menu {
  id: Number;
  name: string;
  router: string;
  icon: string;
  alt: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  protected readonly MODULES = MODULES;

  title: string = "test";

  constructor() {}

  ngOnInit(): void {}
}
