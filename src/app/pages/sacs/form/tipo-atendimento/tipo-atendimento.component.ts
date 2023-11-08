import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "feg-tipo-atendimento",
  templateUrl: "./tipo-atendimento.component.html",
})
export class TipoAtendimentoComponent implements OnInit {
  @Input() form!: any;
  @Output() onSave = new EventEmitter();
  constructor() {}
  tipoAt: any;
  page: 'view' | 'edit' = 'edit';

  opTipoAten = [
    {id: 1, name: 'RMA', value: 'rma'},
    {id: 2, name: 'Suporte Técnico', value: 'ste'}
  ];

  ngOnInit() {}
  
  editar = () => {
    this.page = 'edit';
    this.form.controls['atttId'].enable();
  };

  avancar = () => {
    let tipoAtend = {tipo: this.form.controls['atttId'].value}
    this.page = 'view';
    this.form.controls['atttId'].disable();
    this.onSave.emit(tipoAtend);
  }
}
