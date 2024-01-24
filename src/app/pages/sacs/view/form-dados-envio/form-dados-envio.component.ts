import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';

@Component({
  selector: 'feg-form-dados-envio',
  templateUrl: './form-dados-envio.component.html',
})
export class FormDadosEnvioComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private sacsController: SacsController,
    public abaFormService: AbaFormService
  ) {}
  ngOnInit() {
    this.createForm();
    this.getSacById();
    const param = this.abaFormService.getParams();
    debugger;
    if (param?.id) {
      this.form.controls['id'].setValue(param?.id);
    }
  }

  createForm = () => {
    this.form = this.fb.group({
      id: [null],
      codigoRastreio: ['', [Validators.required]],
      transportadora: ['', [Validators.required]],
      contatoNome: ['', [Validators.required]],
      contatoTelefone: ['', [Validators.required]],
      hardwareProjects: ['', [Validators.required]],
      contatoObs: [''],
    });
  };

  nr: any;
  handleFileInput = (e: any) => {
    this.nr = e.target?.files && e.target?.files[0];
  };

  optionsEquipamentos: any[] = [];
  getSacById = () => {
    this.sacsController.getSacById(this.form.value.id).subscribe({
      next: (resp: any) => {
        debugger;
        this.optionsEquipamentos = resp.data.filter(
          (x: any) => x.SacHardwares.Status.name === 'RMA Aguardando Envio'
        );
      },
    });
  };

  avancar = () => {
    debugger;
    const data = {
      trackingCode: this.form.value.codigoRastreio,
      carrierName: this.form.value.transportadora,
      name: this.form.value.contatoNome,
      phone: this.form.value.contatoTelefone,
      observation: this.form.value.contatoObs,
    };
    debugger;
    this.sacsController.envio(data).subscribe({
      next: () => {},
    });
  };
}
