import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { PermissionService } from "../services/permission.service";

@Injectable({
  providedIn: "root",
})
export class PermissionGuard implements CanActivate {
  constructor(
    private _permissionService: PermissionService,
    private _router: Router
  ) {}

  private _check(names: string[]): Observable<boolean> {
    return this._permissionService.check(names).pipe(
      switchMap((authenticated: boolean) => {
        if (names && names.length && !authenticated) {
          this._router.navigate(["gestao"]);
          return of(false);
        }
        return of(true);
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let dataToCheck = route.data["permissionsCheck"];
    return this._check(dataToCheck || []);
  }
}
