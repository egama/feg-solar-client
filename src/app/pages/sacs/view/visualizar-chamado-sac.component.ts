import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import { FormDadosEnvioComponent } from './form-dados-envio/form-dados-envio.component';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';
import { FormPropostaComponent } from './form-proposta/form-proposta.component';

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

  @ViewChild('cgc') cgc: any;

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

  allMenu: any[] = [];

  menuSelecao: any;
  openMenu = (e: any, item: any) => {
    debugger;
    this.menuSelecao = {
      data: item,
      opcoes: item.menu,
    };
    this.cgc.toggle(event);
  };

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
            menu: this.allMenu.filter((m) =>
              m.status.find((s: any) => s == sh?.statusesId)
            ),
          };
        });

        debugger;
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
      callback: () => {
        this.getSacById();
      },
      params: {
        id: this.id,
      },
    });
  };

  verPropostas = () => {
    this.abaFormService.enable({
      code: 'proposta',
      component: FormPropostaComponent,
      label: 'Proposta',
      callback: () => {
        this.getSacById();
      },
      params: {
        id: this.id,
      },
    });
  };

  hasAnyStatus = (status: any) => {
    return this.equipamentos.some((x) => x.statusId == status);
  };
}
