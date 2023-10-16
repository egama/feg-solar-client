import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { AccessService } from "src/app/core/services/access.service";
import { MenuService } from "src/app/core/services/menu.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "feg-novo-sac",
  templateUrl: "./novo-sac.component.html",
})
export class NovoSacComponent implements OnInit {
  constructor(
    private accessService: AccessService,
    private sanitizer: DomSanitizer,
    private menuService: MenuService,
    private router: Router,

  ) { }
  stepOne: boolean = false;
  stepTwo: boolean = false
  stepThree: boolean = false;
  ngOnInit() { }

  nextStep = (data: any) => {
    if (!this.stepTwo) {
      this.stepTwo = true
    } else if (this.stepTwo && !this.stepThree) {
      this.stepThree = true
    }
  }
}
