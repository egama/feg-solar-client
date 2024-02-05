import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'src/app/core/services/messageService';
import { CoreController } from 'src/app/core/controllers/core/core.controller';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import * as uuid from 'uuid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feg-form-dados-envio',
  templateUrl: './form-dados-envio.component.html',
})
export class FormDadosEnvioComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private sacsController: SacsController,
    public abaFormService: AbaFormService,
    public coreController: CoreController,
    public messageService: MessageService,
    public translateService: TranslateService
  ) {}

  nr: any;
  optionsEquipamentos: any[] = [];

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
      dacte: [null],
      hardwareProjects: [[], [Validators.required]],
      observation: [''],
    });
  };

  handleFileInput = (e: any) => {
    this.nr = e.target?.files && e.target?.files[0];
  };

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
    if (this.nr) {
      this.coreController.upload(this.nr, `logo-${uuid.v1()}.pdf`).subscribe({
        next: (data: any) => {
          this.nr = data.data.Location;
          const envio = {
            ...this.form.value,
            dacte: this.nr,
          };
          
          this.sacsController.envio(envio).subscribe({
            next: async () => {
              this.messageService.success(
                `${await this.translateService.get('Sucesso').toPromise()}`,

                `${await this.translateService
                  .get('Dados de envio efetuado')
                  .toPromise()}`
              );
            },
            complete: () => {
              this.abaFormService.close('completed');
            },
          });
        },
      });
    }
  };
}
