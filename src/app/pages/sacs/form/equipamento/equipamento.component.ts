import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { EquipamentosController } from 'src/app/core/controllers/equipamentos/equipamentos.controller';
import { ProjetosEquipamentosController } from 'src/app/core/controllers/projetos-equipamentos/projetos-equipamentos.controller';
import { TiposEquipamentosController } from 'src/app/core/controllers/tipos-equipamentos/tipos-equipmentos.controller';
import { TiposEquipamentosPerguntasController } from 'src/app/core/controllers/tipos-equipametos-pergutas/tipos-equipametos-pergutas.controller';
import { ENUM_QUESTION_TYPE } from 'src/app/core/enums/enum';

@Component({
  selector: 'feg-novo-equipamento',
  templateUrl: './equipamento.component.html',
})
export class EquipamentoComponent implements OnInit {
  /** Variables */
  optionsTipoEquipamentos: any[] = [];
  optionsEquipamentos: any[] = [];
  optionsModel: any[] = [];
  optionsAwnser: any[] = [];
  allEquipsModel: any[] = [];
  allEquips: any[] = [];
  showForm = true;
  optionDigit: boolean = false;
  listEquipamentos: any[] = [];
  public formCreate: any;

  /** Input & Output * ViewChild */
  @Input() projectsCompanyId: number = 0;
  @Input() form: any;
  // @Output() onAdd = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private equipamentosController: EquipamentosController,
    private tiposEquipamentosController: TiposEquipamentosController,
    private projetosEquipamentosController: ProjetosEquipamentosController,
    private tiposEquipamentosPerguntasController: TiposEquipamentosPerguntasController
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
      hardwareModelId: [null, [Validators.required]],
      eqpText: [null, [Validators.required]],
      answer: this.fb.array([]),
    });
  };

  getTiposEquipamentos = () => {
    debugger
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        debugger
        this.optionsTipoEquipamentos = resp.data;
      },
    });
  };

  getAllEquipamentosByModel = (tipoEquipamentoId: number) => {
    debugger;
    this.equipamentosController
      .getById(tipoEquipamentoId)
      .subscribe({
        next: (resp: any) => {
          debugger;
          const dataArray = [resp.data];
  
          this.allEquipsModel = dataArray;
          this.optionsEquipamentos = this.allEquipsModel.map((equipamento: any) => ({
            description: equipamento.description,
            id: equipamento.id
          }));
          let op = {
            description: 'Digitar',
            id: 0,
          };
          this.optionsEquipamentos.push(op);
        },
      });
  };
  

  

  getAllEquipamentosByProjeto = () => {
    debugger
    this.projetosEquipamentosController
      .getByProjetoId(this.projectsCompanyId)
      .subscribe({
        next: (resp: any) => {
          this.allEquips = resp.data;
        },
      });
  };

  questionsData: any[] = [];
  changeEquipamento = () => {
    debugger
    this.optionDigit = this.formCreate.value.eqp.id == 0;
    this.formCreate.controls['eqpText'].setValue(
      this.formCreate.value.eqp.id == 0
        ? ''
        : this.formCreate.value.eqp.description
    );

    this.formCreate.controls['hardwareModelId'].setValue(
      this.formCreate.value.eqp.id == 0
        ? null
        : this.formCreate.value.eqp.hardwareModelId
    );

    this.tiposEquipamentosPerguntasController
      .getAll(ENUM_QUESTION_TYPE.ATENDIMENTO, this.formCreate.value.tipoEqp.id)
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
      this.getAllEquipamentosByModel(selectedTipoEqp.id);
    }
  };
  
  

  getModeloByType = () => {
    debugger
    const selectedTipoEqp = this.formCreate.value.tipoEqp;

    if (selectedTipoEqp) {
      this.optionsModel = this.allEquipsModel.filter(
        (f: any) => f.hardwareModel.hardwareTypeId === selectedTipoEqp.id
      );
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
      // userProjectId: this.userProjectId,
      hardwareTypeId: this.formCreate.value.tipoEqp.id,
      equipament: this.formCreate.value.eqp.description,
      hardwareModelId: this.formCreate.value.hardwareModelId,
      hardwareProjectId: this.formCreate.value.eqp.id,
      code: this.formCreate.value.eqpText
        ? this.formCreate.value.eqpText
        : this.formCreate.value.eqp.code,
    };
    this.listEquipamentos.push(newData);
    this.showForm = false;

    this.form.setValue(this.listEquipamentos);
    this.resetForm();
  };
}
