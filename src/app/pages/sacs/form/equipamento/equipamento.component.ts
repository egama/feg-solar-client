import * as uuid from 'uuid';
import { Component, Input, OnInit } from '@angular/core';
import { CoreController } from 'src/app/core/controllers/core/core.controller';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { EquipamentosController } from 'src/app/core/controllers/equipamentos/equipamentos.controller';
import { TiposEquipamentosController } from 'src/app/core/controllers/tipos-equipamentos/tipos-equipmentos.controller';
import { ProjetosEquipamentosController } from 'src/app/core/controllers/projetos-equipamentos/projetos-equipamentos.controller';
import { TiposEquipamentosPerguntasController } from 'src/app/core/controllers/tipos-equipametos-pergutas/tipos-equipametos-pergutas.controller';
import { ENUM_QUESTION_TYPE } from 'src/app/core/enums/enum';

@Component({
  selector: 'feg-novo-equipamento',
  templateUrl: './equipamento.component.html',
})
export class EquipamentoComponent implements OnInit {
  /** Variables */
  showForm = true;
  allEquips: any[] = [];
  public formCreate: any;
  optionsModel: any[] = [];
  optionsAwnser: any[] = [];
  allEquipsModel: any[] = [];
  optionDigit: boolean = false;
  listEquipamentos: any[] = [];
  optionsEquipamentos: any[] = [];
  optionsTipoEquipamentos: any[] = [];

  /** Input & Output * ViewChild */
  @Input() form: any;
  @Input() projectsCompanyId: number = 0;
  // @Output() onAdd = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    public coreController: CoreController,
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
      answer: this.fb.array([]),
      eqp: [[null], [Validators.required]],
      eqpText: [null, [Validators.required]],
      tipoEqp: [[null], [Validators.required]],
      hardwareModelId: [null],
    });
  };

  getTiposEquipamentos = () => {
    ;
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        ;
        this.optionsTipoEquipamentos = resp.data;
      },
    });
  };
  
  isSaveButtonDisabled(): boolean {
    const tipoEquipamento = this.formCreate.get('tipoEqp').value;
    const equipamento = this.formCreate.get('eqp').value;
    const modelo = this.formCreate.get('hardwareModelId').value;
    const numeroEquipamento = this.formCreate.get('eqpText').value;
    if (!tipoEquipamento || !equipamento || (equipamento.id === 0 && (!modelo || !numeroEquipamento))) {
      return true;
    }
    return false;
  }

  getAllEquipamentosByModel = (tipoEquipamentoId: number) => {
    ;
    this.equipamentosController.getByType(tipoEquipamentoId).subscribe({
      next: (resp: any) => {
        ; 
        this.allEquipsModel = resp.data;
        let op = {
          description: 'Digitar',
          id: 0,
        };
        this.allEquipsModel.push(op);
      },
    });
  };

  getAllEquipamentosByProjeto = () => {
    ;
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
    ;
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
      file: [null],
      fileName: [null],
    });
  }

  nr: any[] = [];

  selectedFileNames: any[] = [];

  handleFileInput = (e: any, index: number) => {
    const files = e.target?.files;
  
    if (files && files.length > 0) {
      const fileUploadPromises = [];
      this.selectedFileNames[index] = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = this.coreController.upload(file, `EVIDENCIA-${uuid.v1()}.pdf`).toPromise();
        fileUploadPromises.push(promise);
        this.selectedFileNames[index].push(file.name);
      }
      Promise.all(fileUploadPromises).then((responses) => {
        const urls = responses.map((response: any) => response.data.Location);
        this.nr[index] = urls;
      });
    }
  };
  

  changeTipoEquipamento = (e: any) => {
    ;
    const selectedTipoEqp = this.formCreate.value.tipoEqp;

    if (selectedTipoEqp) {
      this.getAllEquipamentosByModel(selectedTipoEqp.id);
    }
  };

  getModeloByType = () => {
    ;
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
    
    let answer = this.formCreate.value.answer.map((item: any,  index: number) => {
      return {
        id: item.id,
        awnser: item.answer,
        awsUrl: this.nr[index],
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
