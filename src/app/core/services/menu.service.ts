import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: "root" })
export class MenuService {
  private menuSource = new Subject<boolean>();
  private key: boolean = false;

  constructor(private localStorage: LocalStorageService) {}

  menuSource$ = this.menuSource.asObservable();

  get menu() {
    const menu = this.localStorage.getItem("menu");

    return menu || [];
  }

  set menu(value: any) {
    this.localStorage.setItem("menu", value);
  }

  toggleMenu() {
    this.key = !this.key;
    this.menuSource.next(this.key);
  }
}
