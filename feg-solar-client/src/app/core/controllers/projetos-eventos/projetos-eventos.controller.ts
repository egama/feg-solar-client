import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class ProjetosEventosController {
  constructor(private api: ApiFegItService) {}
  private prefix = "/projetos-eventos";

  getByProjeto = (id: number): Observable<any> => {
    return this.api.get(`${this.prefix}/${id}/projeto`);
  };

  getById = (id: number): Observable<any> => {
    return this.api.get(`${this.prefix}/${id}`);
  };

  save = (body: any) => {
    return body.id ? this.put(body) : this.post(body);
  };

  private put = (body: any): Observable<any> => {
    return this.api.put(`${this.prefix}`, {
      body,
    });
  };

  private post = (body: any): Observable<any> => {
    return this.api.post(`${this.prefix}`, {
      body,
    });
  };

  uploadEvent = (file: any, projectId: string) => {
    const data = new FormData();
    data.append("file", file);
    data.append("projectId", projectId);

    return this.api.postFile(`${this.prefix}/upload`, data);
  };
}
