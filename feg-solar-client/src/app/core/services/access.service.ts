import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, of, Subject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: "root" })
export class AccessService {
  constructor(private localStorage: LocalStorageService) {}

  _authenticated = false;

  get access() {
    const access = this.localStorage.getItem("access");

    return access;
  }

  set access(value: any) {
    this.localStorage.setItem("access", value);
  }

  check(): Observable<boolean> {
    if (this._authenticated) return of(true);
    else if (!this.access || !this.access.token) return of(false);
    if (!this.isValidExpiration(this.access?.expiration)) return of(false);

    return of(true);
  }

  private isValidExpiration(expiration: string) {
    return moment(expiration) > moment();
  }

  updateImageUrl = (imageUrl: string) => {
    const data = this.access;
    data.imageUrl = imageUrl;
    this.access = data;
  };
}
