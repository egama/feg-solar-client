import { Component, Input, OnInit } from "@angular/core";
import { TranslateService, TranslationChangeEvent } from "@ngx-translate/core";
import { LanguageService } from "src/app/core/services/language.service";

@Component({
  selector: "app-login-template",
  templateUrl: "./login-template.component.html",
})
export class LoginTemplateComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.translate.use(this.languageService.lang);
    translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.languageService.lang = event.lang;
    });
  }

  @Input() styleClass = "";
  language: string = "";

  ngOnInit(): void {
    this.language = this.languageService.lang;
    this.languageService.languageSource$.subscribe((val) => {
      this.language = val;
    });
  }

  languages = [{ code: "pt-br" }, { code: "es" }, { code: "en-us" }];
  setLang = (item: any, op: any, e: any) => {
    op.toggle(e);
    this.translate.use(item.code);
  };
}
