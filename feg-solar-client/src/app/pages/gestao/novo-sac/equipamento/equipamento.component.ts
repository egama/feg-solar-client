import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ProjetosEquipamentosController } from "src/app/core/controllers/projetos-equipamentos/projetos-equipamentos.controller";
import { TiposEquipamentosController } from "src/app/core/controllers/tipos-equipamentos/tipos-equipmentos.controller";
import { TiposEquipamentosPerguntasController } from "src/app/core/controllers/tipos-equipametos-pergutas/tipos-equipametos-pergutas.controller";
import { EquipamentosController } from "src/app/core/controllers/equipamentos/equipamentos.controller";

@Component({
  selector: "feg-novo-equipamento",
  templateUrl: "./equipamento.component.html",
})
export class EquipamentoComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  @Input() projectData: any;

  constructor(
    private fb: UntypedFormBuilder,
    private tiposEquipamentosController: TiposEquipamentosController,
    private projetosEquipamentosController: ProjetosEquipamentosController,
    private tiposEquipamentosPerguntasController: TiposEquipamentosPerguntasController,
    private equipamentosController: EquipamentosController

  ) { }

  nextStep: boolean = false;
  tipoEqps: any[] = [];
  tipoEqp: any;
  eqps: any[] = [];
  allEquips: any[] = [];
  eqp: any;
  eqpText: string = ''
  optionDigit: boolean = false;
  newEqp: boolean = false;
  btnAv: boolean = false;
  questions: any[] = [];
  hardwares: any[] = [];
  answersCommand: any[] = [];

  ngOnInit() {
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        this.tipoEqps = resp.data;
      },
    });
    this.createFilterForm();
    this.getEquips()
  }

  formFilter!: UntypedFormGroup;
  createFilterForm = () => {
    this.formFilter = this.fb.group({
      answers: this.fb.array([])
    });
  };

  get answerForm(): FormArray {
    return this.formFilter.get('answers') as FormArray
  }

  newAnswer(desc: string): FormGroup {
    return this.fb.group({
      description: [desc],
      answer: [null, Validators.required],
    })
  }

  getEqpById = (data: any) => {
    this.projetosEquipamentosController
      .getByProjetoId(this.projectData.factory.id)
      .subscribe({
        next: (resp: any) => {
          this.eqps = resp.data;
          this.eqps = this.eqps.filter((f: any) => f.hardwareModel.hardwareTypeId == this.tipoEqp.id)
          let op = {
            description: 'Digitar',
            id: 0
          };
          this.eqps.push(op);
        },
      });

    this.tiposEquipamentosPerguntasController.getByHardwareId(this.tipoEqp.id).subscribe({
      next: (resp: any) => {
        this.answersCommand = resp.data
        this.answersCommand.map((m: any) => {
          this.answerForm.push(this.newAnswer(m.description))
        })
      },
    });
  };

  getEquips = () => {
    this.projetosEquipamentosController
      .getByProjetoId(this.projectData.factory.id)
      .subscribe({
        next: (resp: any) => {
          this.allEquips = resp.data;
        },
      });

  }

  deleteEqp = (e: any) => {
    this.allEquips.splice(e, 1)
  }


  checkValue = () => {
    if (this.eqp.id == 0) {
      this.optionDigit = true;
      this.eqpText == '' ? '' : this.btnAv = true
    } else {
      this.optionDigit = false;
      this.btnAv = true
    }
  }

  changeAnswer = (pg: any, resp: any, i: number) => {
    let answer = {
      description: pg.description,
      awnser: resp.checked == 1 ? 1 : 0
    }
    this.formFilter.value.answerSwitch.push(answer); //aqui!!
  }

  avancar = () => {
    debugger
    this.formFilter.value
    this.eqpText
    let newData = {
      description: this.eqpText ? this.eqpText : this.eqp.description,
      hardwareModel: {
        hardwareType: {
          name: this.tipoEqp.name
        }
      }
    }
    debugger
    this.allEquips.push(newData)
    this.newEqp = !this.newEqp
    // let data = {
    //   projectsCompanyId: this.eqp.projectsCompanyId,
    //   type: this.projectData.tipo.value,
    //   hardwares: {
    //     hardwareProjectId: this.eqp.id,
    //     hardwareTypeId: this.tipoEqp.id,
    //     hardwareModelId: this.eqp.hardwareModelId,
    //     hardwareProjectCode: this.eqp.projectsCompanyId,
    //     respostas: {

    //     }
    //   }
    // }
    // this.onSave.emit();
  }

}
