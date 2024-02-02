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
<<<<<<< HEAD
    
=======
    debugger;
>>>>>>> 2a3f5c2009d320ac06979d44bb468c254d93567f
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

  getPropostaBySacId = () => {
    this.budgetController.getFinalizadoBySacId(this.form.value.id).subscribe({
      next: (resp: any) => {
<<<<<<< HEAD
        
=======
        debugger;
>>>>>>> 2a3f5c2009d320ac06979d44bb468c254d93567f
        this.data = resp.data;
      },
    });
  };

  avancar = () => {
<<<<<<< HEAD
    
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
=======
    debugger;
    this.sacsController
      .avancar(this.data.id, this.form.value.approved)
      .subscribe({
        next: () => {
          debugger;
>>>>>>> 2a3f5c2009d320ac06979d44bb468c254d93567f
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
}
