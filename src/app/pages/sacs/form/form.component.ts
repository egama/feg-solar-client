import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StepScreen } from './form.types';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { MessageService } from "src/app/core/services/messageService";
import { Router } from '@angular/router';
import { ModalConfirmType } from 'src/app/common/modais/confirm/confirm.type';
import { AbaFormService } from 'src/app/core/services/aba-form.service';

@Component({
  selector: 'feg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    public abaFormService: AbaFormService,
    private sacsController: SacsController,
    private messageService: MessageService,
  ) {}

  @ViewChild("mconf") mconf?: any;
  form!: UntypedFormGroup;
  stepAtual: number = 1;

  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      customer: this.fb.group({
        customerId: [null, [Validators.required]],
        projectsCompanyId: [null, [Validators.required]],
      }),
      attendance: this.fb.group({
        atttId: [null, [Validators.required]],
      }),
      hardwareProjects: [[], [Validators.required, Validators.minLength(1)]],
    });
  };

  getFormChild = (name: string) => {
    return this.form.controls[name];
  };

  onEditInProgress = (data: any) => {
    this.stepAtual = data.step;
  };

  tipoAtendimentoData: any[] = [];

  nextStep = (data: any) => {
    this.stepAtual = data.step + 1;
    if (this.stepAtual <= (StepScreen.EQUIPAMENTOS as number) && data.dirty) {
      // this.form.controls['hardwareProjects'].setValue([]);
    }
  };

  enviar = () => {
    debugger
    this.form;
    const data = {
      type: this.form.controls['attendance'].value?.atttId?.value,
      projectsCompanyId: this.form.controls['customer'].value.projectsCompanyId,
      hardwares: this.form.value.hardwareProjects.map((hp: any) => {
        return {
          hardwareProjectId: hp.hardwareProjectId,
          hardwareProjectCode: hp.code,
          hardwareModelId: hp.hardwareModelId,
          hardwareTypeId: hp.hardwareTypeId,
          answer: hp.answer,
        };
      }),
    };
    this.sacsController.save(data).subscribe({
      next: async (resp) => {
        this.messageService.success('Sucesso', 'Sac criado com sucesso!');
        this.router.navigate(['sac']);
      },
      complete: () => {},
    });
  };

  modal = new ModalConfirmType();
  exitClick(): void {
    this.modal = {
      ...this.modal,
      title: "Você deseja cancelar a operação?",
      subtitle: "Todos os campos preenchidos serão perdidos.",
      actionPrimary: this.cancelExit,
      actionSecundary: this.onCancel,
      labelPrimaryButton: "Não",
      labelSecundaryButton: "Sim",
    };
    this.mconf.openModal();
  }
  
  cancelExit = () => {
    this.abaFormService.closeCanceled();
  };


  onCancel = () => {
    this.router.navigate(["sac"]);
  };
}
