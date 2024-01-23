import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class ClientesController {
  constructor(private api: ApiFegItService) {}
  private prefix = "/clientes";

  getByUserProject = (): Observable<any> => {
    return this.api.get(`${this.prefix}/by-user-project`);
  };

  getByCustomerCompanyId = (id: number): Observable<any> => {
    return this.api.get(`${this.prefix}/by-customer-company/${id}`);
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
}
