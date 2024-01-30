import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'src/app/core/services/messageService';
import { CoreController } from 'src/app/core/controllers/core/core.controller';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import * as uuid from 'uuid';
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
    });
  };

  getPropostaBySacId = () => {
    this.budgetController.getFinalizadoBySacId(this.form.value.id).subscribe({
      next: (resp: any) => {
        debugger;
      },
    });
  };

  aprovar = () => {
    this.form;
    debugger;
  };
  reprovar = () => {
    debugger;
  };
}
