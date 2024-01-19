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
  newEquips: any[] = [];
  hardwares: any[] = [];
  finalizar: boolean = false;

  /** Input & Output * ViewChild */
  @Input() form!: any;
  @Input() projectId!: any;
  @Output() onSave = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private tiposEquipamentosController: TiposEquipamentosController,
    private projetosEquipamentosController: ProjetosEquipamentosController,
    private tiposEquipamentosPerguntasController: TiposEquipamentosPerguntasController,
    private sacsController: SacsController,
    private router: Router,
    private messageService: MessageService
  ) {}

  optionDigit: boolean = false;
  answersCommand: any[] = [];

  ngOnInit() {
    this.getAllEquipamentosAndSelectTipo(this.projectId);
    this.getTiposEquipamentos();
    debugger;
    if (this.projectId.length > 2) {
      if (this.projectId[2]) {
        if (this.projectId[1].equal === false) {
          this.form.controls['tipoEqp'].setValue(
            this.projectId[2].data.tipoEqp
          );
          this.form.controls['eqp'].setValue(this.projectId[2].data.eqp);
          if (this.projectId[2].data.answer) {
            this.form.controls['answer'].setValue(
              this.projectId[2].data.answer
            );
          }
        } else {
          this.form.controls['answer'].reset();
        }
      }
    }
  }

  getTiposEquipamentos = () => {
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        this.optionsTipoEquipamentos = resp.data;
        const selectedTipoEqp = this.form.value.tipoEqp;
        if (selectedTipoEqp) {
          this.getAllEquipamentosAndSelectTipo(selectedTipoEqp);
        }
      },
    });
  };

  getAllEquipamentosAndSelectTipo = (selectedTipoEqp: any) => {
    this.projetosEquipamentosController
      .getByProjetoId(this.projectId[1].data.atttId.id)
      .subscribe({
        next: (resp: any) => {
          this.allEquips = resp.data;
          this.optionsEquipamentos = this.allEquips.filter(
            (f: any) => f.hardwareModel.hardwareTypeId === selectedTipoEqp.id
          );

          let op = {
            description: 'Digitar',
            id: 0,
          };
          this.optionsEquipamentos.push(op);
          this.selectTipo({ value: selectedTipoEqp });
        },
      });
  };

  checkValue = () => {
    debugger;
    if (this.form.value.eqp.id == 0) {
      this.optionDigit = true;
      this.form.value.eqpText == '';
    } else {
      this.optionDigit = false;
    }
  };

  deleteEqp(e: any) {
    this.newEquips.splice(e, 1);
  }

  get answerForm(): FormArray {
    return this.form.get('answer') as FormArray;
  }

  newAnswer(desc: string): FormGroup {
    return this.fb.group({
      description: [desc],
      answer: ["", Validators.required],
    });
  }

  selectTipo = (e: any) => {
    debugger;
    const selectedTipoEqp = this.form.value.tipoEqp;
    if (selectedTipoEqp) {
      this.optionsEquipamentos = this.allEquips.filter(
        (f: any) => f.hardwareModel.hardwareTypeId === selectedTipoEqp.id
      );
      let op = {
        description: 'Digitar',
        id: 0,
      };
      this.optionsEquipamentos.push(op);
      this.tiposEquipamentosPerguntasController
        .getByHardwareId(this.form.value.tipoEqp.id)
        .subscribe({
          next: (resp: any) => {
            this.answersCommand = resp.data;
            this.answersCommand.map((x: any) => {
              this.answerForm.push(this.newAnswer(x.description));
            });
          },
        });
      const eqpDropdown = document.getElementById('eqp');
      if (eqpDropdown) {
        eqpDropdown.dispatchEvent(new Event('change'));
      }
    }
  };

  resetForm() {
    this.form.controls['tipoEqp'].reset();
    this.form.controls['eqp'].reset();
    this.form.controls['eqpText'].reset();
    this.form.controls['answer'].reset();
  }

  avancar = () => {
    debugger;
    this.form.value.eqpText;
    let allAnswers = this.form.value.answer.map((item: any) => {
      return {
        description: item.description,
        awnser: item.answer,
      }
    });
    let newData = {
      answer: allAnswers,
      description: this.form.value.eqpText
        ? this.form.value.eqpText
        : this.form.value.eqp.description,
      hardwareTypeId: this.form.value.tipoEqp.companiesId,
      typeEquipament: this.form.value.tipoEqp.name,
      equipament: this.form.value.eqp.description,
      hardwareProjectId: this.form.value.eqp.id,
      hardwareModelId: this.form.value.eqp.hardwareModelId,
      code: this.form.value.eqp.code,
    };
    this.newEquips.push(newData);

    this.onSave.emit({
      data: this.newEquips,
      step: StepScreen.EQUIPAMENTOS,
    });
    this.finalizar = true;
    this.resetForm();
  };

  finalizarSac = () => {
    debugger;
    const finalData = this.projectId;
    const hardwaresData = (this.projectId[2] = [this.projectId[2]]) ;

    const dadosParaEnviar = {
      projectsCompanyId: finalData[0].data.customerId,
      type: finalData[1].data.atttId.value.toLowerCase(),
      hardwares: hardwaresData,
    };

    this.sacsController.save(dadosParaEnviar).subscribe({
      next: async (resp) => {
        this.messageService.success('Sucesso', 'Sac criado com sucesso!');
        this.router.navigate(['sac']);
      },
      complete: () => {},
    });
  };
}
