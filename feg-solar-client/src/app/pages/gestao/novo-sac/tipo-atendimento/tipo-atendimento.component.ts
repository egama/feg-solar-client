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
  ngOnInit() {
  }



  avancar = () => {
    this.nextStep = true
    this.onSave.emit();
  }

}
