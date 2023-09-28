import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { AccessService } from "src/app/core/services/access.service";
import { MenuService } from "src/app/core/services/menu.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "feg-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  constructor(
    private accessService: AccessService,
    private sanitizer: DomSanitizer,
    private menuService: MenuService,
    private router: Router,

  ) { }

  ngOnInit() { }

  get getImage() {
    return (
      this.accessService.access.imageUrl &&
      this.sanitizer.bypassSecurityTrustUrl(this.accessService.access.imageUrl)
    );
  }

  home() {
    this.router.navigate(["home/meus-chamados"]);
  }

  backHome() {
    this.router.navigate(["home/meus-chamados"]);
  }

  rma = () => {
    debugger
    this.router.navigate(["home/abrir-rma"]);
  };

  tickt = () => {
    this.router.navigate(["home/abrir-tickt"]);
  };
}
