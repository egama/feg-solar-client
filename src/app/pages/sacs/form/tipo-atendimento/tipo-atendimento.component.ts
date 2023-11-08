import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "feg-tipo-atendimento",
  templateUrl: "./tipo-atendimento.component.html",
})
export class TipoAtendimentoComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) {}
  public registerForm!: FormGroup;
  tipoAt: any;
  page: 'view' | 'edit' = 'edit';

  opTipoAten = [
    {id: 1, name: 'RMA', value: 'rma'},
    {id: 2, name: 'Suporte Técnico', value: 'ste'}
  ];

  ngOnInit() {
    this.initForm();
  }
  initForm = () => {
    this.registerForm = this.fb.group({
      tipoAt: [null, [Validators.required]],
    });
  };
  
  editar = () => {
    this.page = 'edit';
    this.registerForm.controls['tipoAt'].enable();
  };

  avancar = () => {
    let tipoAtend = {tipo: this.registerForm.controls['tipoAt'].value}
    this.page = 'view';
    this.registerForm.controls['tipoAt'].disable();
    this.onSave.emit(tipoAtend);
  }
}
