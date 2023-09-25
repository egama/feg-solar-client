import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: "root" })
export class PermissionService {
  constructor(private localStorage: LocalStorageService) {}

  nameKey = "permissions";
  _authenticated = false;

  get permissions() {
    const access = this.localStorage.getItem(this.nameKey);

    return access;
  }

  set permissions(value: any) {
    this.localStorage.setItem(this.nameKey, value);
  }

  check(names: string[]): Observable<boolean> {
    const listF = (this.permissions || []).filter((p: string) =>
      names.find((n) => n == p)
    );

    return of(listF.length > 0);
  }
}
