import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class TiposEquipamentosPerguntasController {
  constructor(private api: ApiFegItService) {}
  private prefix = "/hardware-type-question";

  getAll = (applcation: number): Observable<any> => {
    return this.api.get(`${this.prefix}/${applcation}/all`);
  };

  getById = (id: number): Observable<any> => {
    return this.api.get(`${this.prefix}/${id}`);
  };

  getByHardwareId = (hardwareId: number): Observable<any> => {
    return this.api.get(`${this.prefix}/type/${hardwareId}`);
  };

  save = (body: any) => {
    return body.id ? this.put(body) : this.post(body);
  };

  private put = (body: any): Observable<any> => {
    return this.api.put(`${this.prefix}`, body);
  };

  private post = (body: any): Observable<any> => {
    return this.api.post(`${this.prefix}`, body);
  };

  delete = (id: number): Observable<any> => {
    return this.api.delete(`${this.prefix}/${id}`);
  };

  active = (id: number): Observable<any> => {
    return this.api.put(`${this.prefix}/active/${id}`, {});
  };
}
