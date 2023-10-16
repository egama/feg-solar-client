import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { EquipamentosController } from "src/app/core/controllers/equipamentos/equipamentos.controller";
import { TiposEquipamentosController } from "src/app/core/controllers/tipos-equipamentos/tipos-equipmentos.controller";

@Component({
  selector: "feg-novo-equipamento",
  templateUrl: "./equipamento.component.html",
})
export class EquipamentoComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  constructor(
    private tiposEquipamentosController: TiposEquipamentosController,
    private equipamentosController: EquipamentosController
  ) { }

  nextStep: boolean = false;
  tipoEqps: any[] = [];
  tipoEqp: any;
  eqps: any[] = [];
  eqp: any;
  eqpText: string = ''
  optionDigit: boolean = false;
  btnAv: boolean = false;

  ngOnInit() {
    this.tiposEquipamentosController.getEquipamentos().subscribe({
      next: (resp: any) => {
        this.tipoEqps = resp.data;
      },
    });
  }

  getEqpById = (data: any) => {
    this.equipamentosController.getByType(data.value.id, 1).subscribe({
      next: (resp: any) => {
        this.eqps = resp.data;
        let op = {
          description: 'Digitar',
          id: 0
        }
        this.eqps.push(op)
      },
    });
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

  avancar = () => {
    this.nextStep = true
    this.onSave.emit();
  }

}
