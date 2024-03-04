import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import { FormDadosEnvioComponent } from './form-dados-envio/form-dados-envio.component';
import { ENUM_STATUS_SAC } from 'src/app/core/enums/enum';
import { FormPropostaComponent } from './form-proposta/form-proposta.component';
import { ModalConfirmType } from 'src/app/common/modais/confirm/confirm.type';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/messageService';
import { FormRespostasComponent } from './form-respostas/form-respostas.component';

@Component({
  selector: 'feg-visualizar-sac',
  templateUrl: './visualizar-chamado-sac.component.html',
})
export class VisualizarSacComponent implements OnInit, OnDestroy {
  constructor(
    private sacsController: SacsController,
    public abaFormService: AbaFormService,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    this.activatedrouter.params.subscribe((params) => {
      if (params && params['id']) this.id = params['id'];
    });
  }

  @ViewChild('cgc') cgc: any;
  @ViewChild('mconf') mconf?: any;

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

  allMenu: any[] = [
    {
      label: 'Responder',
      status: [
        ENUM_STATUS_SAC.STE_AGUARDANDO_CLIENTE,
      ],
      command: (e: any) => {
        this.cgc.hide();
        this.questionPortal();
      },
    },
    {
      label: 'Cancelar',
      status: [
        ENUM_STATUS_SAC.RMA_AGUARDANDO_ENVIO,
      ],
      command: (e: any) => {
        this.cgc.hide();
        this.confirmExclude();
      },
    },
  ];

  modalConfirm = new ModalConfirmType();
  confirmExclude = async () => {
    this.modalConfirm = {
      ...this.modalConfirm,
      data: this.menuSelecao.data,
      callbackSuccess: () => {},
      title: await this.translate.get('Atenção!').toPromise(),
      subtitle: await this.translate
        .get('Deseja cancelar a RMA em questão?')
        .toPromise(),
      actionPrimary: () => {},
      actionSecundary: () => this.deletar(),
      labelPrimaryButton: await this.translate.get('Cancelar').toPromise(),
      labelSecundaryButton: await this.translate.get('Confirmar').toPromise(),
    };
    this.mconf.openModal();
  };

  deletar = async () => {
    this.sacsController.delete(this.modalConfirm.data.id).subscribe({
      next: async (resp: any) => {
        this.messageService.success(
          `${await this.translate.get('Sucesso').toPromise()}`,
          `${await this.translate
            .get('RMA cancelada com sucesso!')
            .toPromise()}`
        );
        this.getSacById();
      },
    });
  };

  menuSelecao: any;
  openMenu = (e: any, item: any) => {
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
            id: sh?.id,
            tipo: sh?.HardwareProjects?.hardwareModel?.hardwareType?.name,
            equipamento: sh?.HardwareProjects?.description,
            status: sh?.Status?.name,
            statusId: sh?.statusesId,
            menu: this.allMenu.filter((m) =>
              m.status.find((s: any) => s == sh?.statusesId)
            ),
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
      callback: () => {
        this.getSacById();
      },
      params: {
        id: this.id,
      },
    });
  };

  questionPortal = () => {
    
    this.abaFormService.enable({
      code: 'question',
      component: FormRespostasComponent,
      label: 'Responder',
      callback: () => {
        this.getSacById();
      },
      params: {
        id: this.menuSelecao.data.id,
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
