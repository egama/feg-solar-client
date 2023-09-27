import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class AuthController {
  constructor(private api: ApiFegItService) {}

  login = (email: string, password: string): Observable<any> => {
    return this.api.post(
      `/auth/portal`,
      {
        email,
        password,
      },
      false
    );
  };

  loginClient = (email: string, password: string): Observable<any> => {
    debugger
    return this.api.post(
      `/auth/client`,
      {
        email,
        password,
      },
      false
    );
  };

  esqueciSenha = (email: string): Observable<any> => {
    return this.api.post(
      `/auth/forgot`,
      {
        email,
      },
      false
    );
  };

  novaSenha = (key: string, password: string): Observable<any> => {
    return this.api.post(
      `/auth/new-password`,
      {
        key,
        password,
      },
      false
    );
  };

  validateKey = (key: string): Observable<any> => {
    return this.api.get(`/auth/validate-key?key=${key}`, undefined, false);
  };
}
