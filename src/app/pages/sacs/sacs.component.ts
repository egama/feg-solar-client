import { Component, OnInit, ViewChild } from '@angular/core';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/messageService';
import { ModalConfirmType } from 'src/app/common/modais/confirm/confirm.type';

@Component({
  selector: 'app-sacs',
  templateUrl: './sacs.component.html',
})
export class SacsComponent implements OnInit {
  @ViewChild('cgc') cgc: any;
  @ViewChild('mconf') mconf?: any;
  id: any;
  data: any[] = [];
  sacSelected: any = null;
  menuSelecao: any;
  formFilter!: UntypedFormGroup;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private sacsController: SacsController,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSacs();
    this.createFilterForm();
  }

  createFilterForm = () => {
    this.formFilter = this.fb.group({
      search: [''],
    });
  };

  search = (tb1: any) => {
    tb1.filterGlobal(this.formFilter.value.search, 'contains');
  };

  novo = async () => {
    this.router.navigate(['sac/new']);
  };

  modal = new ModalConfirmType();
  exitClick(): void {
    this.modal = {
      ...this.modal,
      title: 'Você deseja cancelar esse SAC?',
      actionPrimary: this.cancelExit,
      actionSecundary: this.deletSac,
      labelPrimaryButton: 'Não',
      labelSecundaryButton: 'Sim',
    };
    this.mconf.openModal();
  }

  cancelExit = () => {};

  deletSac = () => {
    this.sacsController.delete(this.id).subscribe({
      next: (resp: any) => {},
      complete: () => {
        this.messageService.success('Sucesso', 'SAC cancelado com sucesso!');
        this.getSacs();
      },
    });
  };

  createMenuItem = async (event: any, data: any) => {
    const menuItem = [
      {
        label: `Ver Histórico`,
        command: () => {
          this.cgc.hide();
          this.router.navigate([`sac/view/${data.id}`]);
        },
      },
      {
        label: `Cancelar`,
        command: () => {
          this.id = data.id;
          this.cgc.hide();
          this.exitClick();
        },
      },
    ];
    this.menuSelecao = {
      data,
      menuItem,
    };
    this.cgc.toggle(event);
  };

  getSacs = () => {
    this.sacsController.getMine().subscribe({
      next: (resp) => {
        
        this.data = resp.data;
      },
      complete: () => {},
    });
  };
}
