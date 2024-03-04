

import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { SacsController } from "src/app/core/controllers/sacs/sacs.controller";
import { TiposEquipamentosPerguntasController } from "src/app/core/controllers/tipos-equipametos-pergutas/tipos-equipametos-pergutas.controller";
import { ENUM_QUESTION_TYPE } from "src/app/core/enums/enum";
import { AbaFormService } from "src/app/core/services/aba-form.service";
import { MessageService } from "src/app/core/services/messageService";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'feg-form-respostas',
  templateUrl: './form-respostas.component.html',
})
export class FormRespostasComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private abaFormService: AbaFormService,
    private sacsController: SacsController,
    private tiposEquipamentosPerguntasController: TiposEquipamentosPerguntasController,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  data: any;
  breadcrumbs: any = [];
  respostas: any[] = [];
  public form!: UntypedFormGroup;

  ngOnInit() {
    this.createForm();
    const param = this.abaFormService.getParams();
    
    if (param?.id) {
      this.form.controls["sacHardwaresId"].setValue(param?.id);
      this.getQuestionsById();
    }
  }

  createForm = () => {
    this.form = this.fb.group({
      sacHardwaresId: ["", Validators.required],
      guarantee: [false, Validators.required],
      repair: [false, Validators.required],
      confirmed: [true],
      answer: ["", Validators.required],
    });
  };

  get answerForm(): FormArray {
    return this.form.get("answer") as FormArray;
  }

  getQuestionsById = () => {
    
    this.tiposEquipamentosPerguntasController
      .getSacByIdQuestionSte(this.form.value.sacHardwaresId)
      .subscribe({
        next: (resp: any) => {
          this.respostas = resp.data
        },
        complete: () => {console.log("Deu certo!")},
      });
  };


  save = () => {
    
    this.tiposEquipamentosPerguntasController
      .postSacByIdQuestionSte(this.form.value.sacHardwaresId, this.form.value)
      .subscribe({
        next: async () => {
          this.messageService.success(
            `${await this.translateService.get("Análise tecnica").toPromise()}`,

            `${await this.translateService
              .get("Análise tecnica feita com sucesso")
              .toPromise()}`
          );
        },
        complete: () => {
          this.abaFormService.close("completed");
        },
      });
  };

  cancel = () => {
    this.abaFormService.closeConfirm();
  };
}
