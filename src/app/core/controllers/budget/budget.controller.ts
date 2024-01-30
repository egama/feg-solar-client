import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiFegItService } from '../../services/api-fegit.service';
import { ENUM_STATUS } from '../../enums/enum';

@Injectable({ providedIn: 'root' })
export class BudgetController {
  constructor(private api: ApiFegItService) {}
  private prefix = '/budget';

  getFinalizadoBySacId = (sacId: number): Observable<any> => {
    return this.api.post(`${this.prefix}/by-sac/${sacId}`, {
      status: ENUM_STATUS.ORCAMENTO_FINALIZADO,
    });
  };
}
