import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, of, Subject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class GoogleService {
  constructor(private http: HttpClient) {}

  getCEP = (cep: string) => {
    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .toPromise()
      .then((x) => x);
  };

  getLocation = async (cep: string): Promise<any> => {
    const geo: any = await this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleKey}&address=${cep}$sensor=false`
      )
      .toPromise();

    if (geo.results && geo.results.length > 0) {
      return geo.results[0].geometry.location;
    } else {
      return null;
    }
  };
}
