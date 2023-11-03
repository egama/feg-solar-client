import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: "root" })
export class LanguageService {
  private languageSource = new Subject<string>();

  constructor(
    private localStorage: LocalStorageService
  ) {
  }

  languageSource$ = this.languageSource.asObservable();

  get lang() {
    const lang = this.localStorage.getItem("lang");

    return lang || "pt-br";
  }

  set lang(value: string) {
    this.localStorage.setItem("lang", value);
    this.languageSource.next(value);
  }
}
