import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { AccessService } from "src/app/core/services/access.service";
import { MenuService } from "src/app/core/services/menu.service";
import { Router } from '@angular/router';

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

  backHome() {
    this.router.navigate(["sac"]);
  }


  novoSac = () => {
    this.router.navigate(["sac/new"]);
  };
}
