import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProjetosEquipamentosController } from 'src/app/core/controllers/projetos-equipamentos/projetos-equipamentos.controller';
import { TiposEquipamentosController } from 'src/app/core/controllers/tipos-equipamentos/tipos-equipmentos.controller';
import { TiposEquipamentosPerguntasController } from 'src/app/core/controllers/tipos-equipametos-pergutas/tipos-equipametos-pergutas.controller';
import { EquipamentosController } from 'src/app/core/controllers/equipamentos/equipamentos.controller';
import { StepScreen } from '../form.types';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { MessageService } from 'src/app/core/services/messageService';
import { Router } from '@angular/router';
import { ENUM_MENU_APPLICATION } from 'src/app/core/enums/enum';

@Component({
  selector: 'feg-novo-equipamento',
  templateUrl: './equipamento.component.html',
})
export class EquipamentoComponent implements OnInit {
  /** Variables */
  optionsTipoEquipamentos: any[] = [];
  optionsEquipamentos: any[] = [];
  optionsAwnser: any[] = [];
  allEquips: any[] = [];
  showForm = true;
  optionDigit: boolean = false;
  listEquipamentos: any[] = [];
  public formCreate: any;

  /** Input & Output * ViewChild */
  @Input() projectId: number = 0;
  @Input() form: any;
  // @Output() onAdd = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private tiposEquipamentosController: TiposEquipamentosController,
    private projetosEquipamentosController: ProjetosEquipamentosController,
    private tiposEquipamentosPerguntasController: TiposEquipamentosPerguntasController,
    private sacsController: SacsController,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getTiposEquipamentos();
    this.getAllEquipamentosByProjeto();
  }

  createForm = () => {
    this.formCreate = this.fb.group({
      tipoEqp: [[null], [Validators.required]],
      eqp: [[null], [Validators.required]],
      eqpText: [null, [Validators.required]],
      answer: this.fb.array([]),
    });
  };

  getTiposEquipamentos = () => {
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        this.optionsTipoEquipamentos = resp.data;
      },
    });
  };

  getAllEquipamentosByProjeto = () => {
    this.projetosEquipamentosController
      .getByProjetoId(this.projectId)
      .subscribe({
        next: (resp: any) => {
          this.allEquips = resp.data;
        },
      });
  };

  questionsData: any[] = [];
  changeEquipamento = () => {
    this.formCreate.value.eqpText == '';
    this.optionDigit = this.formCreate.value.eqp.id == 0;

    this.tiposEquipamentosPerguntasController
      .getAll(ENUM_MENU_APPLICATION.WEB, this.formCreate.value.tipoEqp.id)
      .subscribe({
        next: (resp: any) => {
          this.questionsData = resp.data;
          resp.data.map((x: any) => {
            this.answerForm.push(this.newAnswer(x));
          });
        },
      });
  };

  deleteEqp(e: any) {
    this.listEquipamentos.splice(e, 1);
    this.form.setValue(this.listEquipamentos);

    if (this.listEquipamentos.length == 0) {
      this.showForm = true;
    }
  }

  openForm = () => {
    this.showForm = true;
    this.formCreate;
    debugger;
    this.resetForm();
  };

  get answerForm(): FormArray {
    return this.formCreate.get('answer') as FormArray;
  }

  newAnswer(data: any): FormGroup {
    return this.fb.group({
      id: [data.id],
      description: [data.description],
      typeQuestion: [data.typeQuestion],
      answer: ['', Validators.required],
    });
  }

  changeTipoEquipamento = (e: any) => {
    const selectedTipoEqp = this.formCreate.value.tipoEqp;

    if (selectedTipoEqp) {
      this.optionsEquipamentos = this.allEquips.filter(
        (f: any) => f.hardwareModel.hardwareTypeId === selectedTipoEqp.id
      );
      let op = {
        description: 'Digitar',
        id: 0,
      };
      this.optionsEquipamentos.push(op);
    }
  };

  resetForm() {
    this.formCreate.controls['tipoEqp'].reset();
    this.formCreate.controls['eqp'].reset();
    this.formCreate.controls['eqpText'].reset();
    this.formCreate.controls['answer'].clear();
    this.questionsData = [];
  }

  avancar = () => {
    let answer = this.formCreate.value.answer.map((item: any) => {
      return {
        id: item.id,
        awnser: item.answer,
      };
    });

    let newData = {
      description: `${this.formCreate.value.tipoEqp.name} - ${
        this.formCreate.value.eqpText
          ? this.formCreate.value.eqpText
          : this.formCreate.value.eqp.description
      }`,
      answer,
      hardwareTypeId: this.formCreate.value.tipoEqp.id,
      equipament: this.formCreate.value.eqp.description,
      hardwareProjectId: this.formCreate.value.eqp.id,
      code: this.formCreate.value.eqp.code,
    };
    this.listEquipamentos.push(newData);
    this.showForm = false;

    this.form.setValue(this.listEquipamentos);
    this.resetForm();
  };

  finalizarSac = () => {
    // const finalData = this.projectId;
    // const hardwaresData = (this.projectId[2] = [this.projectId[2]]);
    // const dadosParaEnviar = {
    //   projectsCompanyId: finalData[0].data.customerId,
    //   type: finalData[1].data.atttId.value.toLowerCase(),
    //   hardwares: hardwaresData,
    // };
    // this.sacsController.save(dadosParaEnviar).subscribe({
    //   next: async (resp) => {
    //     this.messageService.success('Sucesso', 'Sac criado com sucesso!');
    //     this.router.navigate(['sac']);
    //   },
    //   complete: () => {},
    // });
  };
}
