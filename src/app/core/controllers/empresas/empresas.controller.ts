import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class EmpresasController {
  constructor(private api: ApiFegItService) {}
  private prefix = "/empresas";

  create = (body: any): Observable<any> => {
    return this.api.post(this.prefix, body, false);
  };

  updateMatriz = (body: any): Observable<any> => {
    return this.api.put(`${this.prefix}/matriz`, body);
  };

  updateMatrizImage = (imageUrl: string): Observable<any> => {
    return this.api.put(`${this.prefix}/matriz/image`, { imageUrl });
  };

  getMatriz = (): Observable<any> => {
    return this.api.get(`${this.prefix}/matriz`);
  };
}
