import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'feg-form-dados-envio',
  templateUrl: './form-dados-envio.component.html',
})
export class FormDadosEnvioComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}
  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      codigoRastreio: [''],
      transportadora: [''],
      contatoNome: [''],
      contatoTelefone: [''],
      contatoObs: [''],
    });
  };

  nr: any;
  handleFileInput = (e: any) => {
    this.nr = e.target?.files && e.target?.files[0];
  };
}
