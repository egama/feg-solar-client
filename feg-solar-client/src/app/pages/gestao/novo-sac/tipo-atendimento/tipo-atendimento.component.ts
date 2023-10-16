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
      name: 'RMA'
    },
    {
      id: 2,
      name: 'Suporte'
    }
  ];

  tipoAt: any;
  ngOnInit() {
  }


  avancar = () => {
    this.nextStep = true
    this.onSave.emit();
  }

}
