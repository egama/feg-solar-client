import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';
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
    const param = this.abaFormService.getParams();

    if (param?.id) {
      this.form.controls['id'].setValue(param?.id);
    }

    this.getSacById();
  }

  createForm = () => {
    this.form = this.fb.group({
      id: [null],
      trackingCode: ['', [Validators.required]],
      carrierName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dacte: ['', [Validators.required]],
      hardwareProjects: [[], [Validators.required]],
      observation: [''],
    });
  };

  nr: any;
  handleFileInput = (e: any) => {
    debugger
    this.nr = e.target?.files && e.target?.files[0];
    debugger
  };

  optionsEquipamentos: any[] = [];
  getSacById = () => {
    this.sacsController.getSacById(this.form.value.id).subscribe({
      next: (resp: any) => {
        this.optionsEquipamentos = (resp.data?.SacHardwares || []).filter(
          (x: any) => x.statusesId === ENUM_STATUS_SAC.RMA_AGUARDANDO_ENVIO
        );
      },
    });
  };

  avancar = () => {
    debugger;
    const data = {
      ...this.form.value,
      dacte: 'urlAqui',
    };
    debugger;
    this.sacsController.envio(data).subscribe({
      next: () => {},
    });
  };
}
