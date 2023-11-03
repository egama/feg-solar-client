import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "feg-tipo-atendimento",
  templateUrl: "./tipo-atendimento.component.html",
})
export class TipoAtendimentoComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  constructor(
  ) { }
  nextStep: boolean = false;

  opTipoAten = [
    {
      id: 1,
      name: 'RMA',
      value: 'rma'
    },
    {
      id: 2,
      name: 'Suporte Técnico',
      value: 'ste'
    }
  ];

  tipoAt: any;
  ngOnInit() {
  }


  avancar = () => {
    let tipoAtend = {
     tipo: this.tipoAt
    }
    this.nextStep = true
    this.onSave.emit(tipoAtend);
  }

}
