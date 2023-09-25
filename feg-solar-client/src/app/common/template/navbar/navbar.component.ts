import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { AccessService } from "src/app/core/services/access.service";
import { MenuService } from "src/app/core/services/menu.service";

@Component({
  selector: "feg-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  constructor(
    private accessService: AccessService,
    private sanitizer: DomSanitizer,
    private menuService: MenuService

  ) { }

  ngOnInit() { }

  get getImage() {
    return (
      this.accessService.access.imageUrl &&
      this.sanitizer.bypassSecurityTrustUrl(this.accessService.access.imageUrl)
    );
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
