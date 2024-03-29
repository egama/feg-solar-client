import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/messageService';
import { CoreController } from 'src/app/core/controllers/core/core.controller';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import { TranslateService } from '@ngx-translate/core';
import { BudgetController } from 'src/app/core/controllers/budget/budget.controller';

@Component({
  selector: 'feg-form-proposta',
  templateUrl: './form-proposta.component.html',
})
export class FormPropostaComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private sacsController: SacsController,
    public abaFormService: AbaFormService,
    public coreController: CoreController,
    public budgetController: BudgetController,
    public messageService: MessageService,
    public translateService: TranslateService
  ) {}

  proposta: any[] = [];
  data: any;
  approved: any;

  ngOnInit() {
    this.createForm();

    const param = this.abaFormService.getParams();
    if (param?.id) {
      this.form.controls['id'].setValue(param?.id);
    }
    this.getPropostaBySacId();
  }

  createForm = () => {
    this.form = this.fb.group({
      id: [null],
      lido: [false],
      approved: [false],
    });
  };

  listEquips: any[] = [];
  getPropostaBySacId = () => {
    this.listEquips = [];
    this.budgetController.getFinalizadoBySacId(this.form.value.id).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        (resp.data.BudgetsItems || []).map((d: any) => {
          const ind = this.listEquips.findIndex(
            (i) => i.sacHardwaresId == d.sacHardwaresId
          );
          if (ind < 0) {
            this.listEquips.push({
              sacHardwaresId: d.sacHardwaresId,
              description: d.SacHardwares.HardwareProjects.description,
              propostas: [d],
            });
          } else {
            this.listEquips[ind].propostas.push(d);
          }
        });
      },
    });
  };

  avancar = () => {
    this.sacsController
      .avancarResposta(this.data.id, this.form.value)
      .subscribe({
        next: async () => {
          this.messageService.success(
            `${await this.translateService.get('Proposta').toPromise()}`,
            `${await this.translateService
              .get('Proposta respondida com sucesso!')
              .toPromise()}`
          );
        },
        complete: () => {
          this.abaFormService.close('completed');
        },
      });
  };

  aprovar = () => {
    this.form.controls['approved'].setValue(true);
    this.avancar();
  };

  reprovar = () => {
    this.form.controls['approved'].setValue(false);
    this.avancar();
  };

  private sumByKey = (key: string) => {
    return (this.data.BudgetsItems || []).reduce(
      (accumulator: any, currentValue: any) => accumulator + parseFloat(currentValue[key]),
      0
    );
  };

  get qtd() {
    return this.sumByKey('unit');
  }
  get sub() {
    return this.sumByKey('unitPrice');
  }
  get desc() {
    return this.sumByKey('discount');
  }
  get valueTotal() {
    return this.sumByKey('totalPrice');
  }
}
