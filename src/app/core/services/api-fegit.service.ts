import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry, switchMap, timeout } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { MessageService } from "./messageService";
import { Router } from "@angular/router";
import { LanguageService } from "./language.service";

@Injectable({ providedIn: "root" })
export class ApiFegItService {
  private _urlService: string;
  private timeout = 300000;

  get access(): any {
    const access: any = this.storageService.getItem("access");
    if (!access) return null;

    return access;
  }

  get accessToken(): string {
    return this.access?.token;
  }

  get prefeituraEndereco(): string {
    return this.access?.prefeituraEndereco;
  }

  //não alterar consulta base apiImperioo
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
    private storageService: LocalStorageService,
    private languageService: LanguageService,
    private router: Router,
    private messageService: MessageService
  ) {
    this._urlService = environment.api;
  }

  get(url: string, params?: HttpParams, auth: boolean = true): Observable<any> {
    return this._httpClient
      .get<any>(`${this._urlService}${url}`, {
        ...this.getHeader(auth, true),
        params,
      })
      .pipe(timeout(this.timeout), catchError(this.catchError));
  }

  getPagination(
    url: string,
    params?: HttpParams,
    auth: boolean = true
  ): Observable<any> {
    return this._httpClient
      .get<any>(`${this._urlService}${url}`, {
        ...this.getHeader(auth, true),
        params,
        observe: "response",
      })
      .pipe(catchError(this.catchError));
  }

  post(url: string, data: any, auth: boolean = true): Observable<any> {
    return this._httpClient
      .post<any>(`${this._urlService}${url}`, data, this.getHeader(auth, true))
      .pipe(timeout(this.timeout), catchError(this.catchError));
  }

  postFile(url: string, data: FormData, auth: boolean = true): Observable<any> {
    return this._httpClient
      .post<any>(`${this._urlService}${url}`, data, this.getHeader(auth, false))
      .pipe(timeout(this.timeout), catchError(this.catchError));
  }

  put(url: string, data: any, auth: boolean = true): Observable<any> {
    return this._httpClient
      .put<any>(`${this._urlService}${url}`, data, this.getHeader(auth, true))
      .pipe(timeout(this.timeout), catchError(this.catchError));
  }

  delete(url: string, data?: {}, auth: boolean = true): any {
    return this._httpClient
      .delete<any>(`${this._urlService}${url}`, {
        ...this.getHeader(auth, true),
        ...data,
      })
      .pipe(timeout(this.timeout), catchError(this.catchError));
  }

  private getHeader(auth: boolean, isJson: boolean) {
    let hh: any = {
      Language: this.languageService.lang,
    };
    if (this.accessToken && auth) {
      const auth = "Bearer " + this.accessToken;

      hh = {
        ...hh,
        Authorization: auth,
      };
    }
    if (isJson) {
      hh = {
        ...hh,
        "Content-Type": "application/json",
      };
    }

    return { headers: new HttpHeaders(hh) };
  }

  private catchError = (error: any) => {
    if (error.status == 401) {
      this.storageService.removeItem("access");
      this.router.navigate(["sign-in"]);
    }

    if (
      error.status == 400 ||
      (error.error != null && error.error.message != null)
    ) {
      const e = error?.error;
      this.messageService.error("Erro", e?.message);
      return throwError(e);
    }

    throw error;
  };
}
