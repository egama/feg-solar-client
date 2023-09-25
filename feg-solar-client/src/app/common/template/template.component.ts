import { Component, OnInit } from "@angular/core";
import { TranslateService, TranslationChangeEvent } from "@ngx-translate/core";
import { LanguageService } from "src/app/core/services/language.service";

@Component({
  selector: "feg-template",
  templateUrl: "./template.component.html",
})
export class TemplateComponent implements OnInit {
  menuItems: any[] = [];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.languageService.lang);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.languageService.lang = event.lang;
    });
  }
}
