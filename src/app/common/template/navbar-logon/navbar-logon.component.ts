import { Component, OnInit, ViewChild } from "@angular/core";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/core/services/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "feg-navbar-logon",
  templateUrl: "./navbar-logon.component.html",
})
export class NavbarLogonComponent implements OnInit {
  @ViewChild("ol") ol: any;
  @ViewChild("oplang") oplang: any;

  itensMenu: any = [];
  languages = [{ code: "pt-br" }, { code: "es" }, { code: "en-us" }];

  constructor(
    private localStorageService: LocalStorageService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    const lang = this.languageService.lang;
    this.createMenu(lang);

    this.languageService.languageSource$.subscribe((val) => {
      this.createMenu(val);
    });
  }

  createMenu = (lang: string) => {
    this.itensMenu = [
      {
        icon: "pi-lock",
        label: "Alterar Senha",
        command: () => {
          this.router.navigate(["configuracao/primeiro-acesso"]);
        },
      },
      {
        image: `assets/images/lang/${lang}.png`,
        label: "Idioma",
        command: (e: any) => {
          this.oplang.toggle(e);
        },
      },
      {
        icon: "pi-sign-out",
        label: "Sair",
        command: () => {
          this.localStorageService.removeItem("access");
          this.router.navigate(["login"]);
        },
      },
    ];
  };

  toggle = (event: any) => {
    this.ol.toggle(event);
  };

  setLang = (item: any, op: any, e: any) => {
    op.toggle(e);
    this.translate.use(item.code);
  };
}
