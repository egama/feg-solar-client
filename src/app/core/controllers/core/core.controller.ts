import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiFegItService } from "../../services/api-fegit.service";

@Injectable({ providedIn: "root" })
export class CoreController {
  constructor(private api: ApiFegItService) {}
  private prefix = "/core";

  upload = (file: any, name: string) => {
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);

    return this.api.postFile(`${this.prefix}/upload`, data);
  };

  uploadContract(data: { contractFile: any; contractNumber: string }) {
    const formData = new FormData();
    formData.append("file", data.contractFile);
    formData.append("name", data.contractNumber);
  
    return this.api.put(`${this.prefix}/contract`, formData);
  }
}
