import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import { FormDadosEnvioComponent } from './form-dados-envio/form-dados-envio.component';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';

@Component({
  selector: 'feg-visualizar-sac',
  templateUrl: './visualizar-chamado-sac.component.html',
})
export class VisualizarSacComponent implements OnInit, OnDestroy {
  constructor(
    private sacsController: SacsController,
    public abaFormService: AbaFormService,
    private router: Router,
    private activatedrouter: ActivatedRoute
  ) {
    this.activatedrouter.params.subscribe((params) => {
      if (params && params['id']) this.id = params['id'];
    });
  }

  form!: UntypedFormGroup;
  data: any;
  id: number = 0;
  ENUM_STATUS_SAC = ENUM_STATUS_SAC;
  ngOnInit() {
    this.getSacById();
  }
  ngOnDestroy(): void {
    this.abaFormService.close();
  }

  equipamentos: any[] = [];
  getSacById = () => {
    this.sacsController.getSacById(this.id).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        this.equipamentos = (resp.data?.SacHardwares || []).map((sh: any) => {
          return {
            tipo: sh?.HardwareProjects?.hardwareModel?.hardwareType?.name,
            equipamento: sh?.HardwareProjects?.description,
            status: sh?.Status?.name,
            statusId: sh?.statusesId,
          };
        });
      },
    });
  };

  voltar = () => {
    this.router.navigate(['sac']);
  };

  setarDadosEnvio = () => {
    this.abaFormService.enable({
      code: 'dados-envio',
      component: FormDadosEnvioComponent,
      label: 'Dados de envio',
      callback: () => {},
      params: {
        id: this.id,
      },
    });
  };

  hasAnyStatus = (status: any) => {
    return this.equipamentos.some((x) => x.statusId == status);
  };
}
