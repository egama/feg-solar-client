import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StepScreen } from './form.types';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';

@Component({
  selector: 'feg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private sacsController: SacsController
  ) {}

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
    this.form;
    debugger;
    const data = {
      type: this.form.controls['attendance'].value?.atttId?.value,
      projectsCompanyId: this.form.controls['customer'].value.projectsCompanyId,
      hardwares: this.form.value.hardwareProjects.map((hp: any) => {
        return {
          hardwareProjectId: hp.hardwareProjectId,
          hardwareProjectCode: hp.code,
          hardwareTypeId: hp.hardwareTypeId,
          answer: hp.answer,
        };
      }),
    };
    debugger;
    this.sacsController.save(data).subscribe({
      next: async (resp) => {
        // this.messageService.success('Sucesso', 'Sac criado com sucesso!');
        // this.router.navigate(['sac']);
      },
      complete: () => {},
    });
  };

  finalizarSac = () => {
    // const finalData = this.projectId;
    // const hardwaresData = (this.projectId[2] = [this.projectId[2]]);
    // const dadosParaEnviar = {
    //   projectsCompanyId: finalData[0].data.customerId,
    //   type: finalData[1].data.atttId.value.toLowerCase(),
    //   hardwares: hardwaresData,
    // };
    // this.sacsController.save(dadosParaEnviar).subscribe({
    //   next: async (resp) => {
    //     this.messageService.success('Sucesso', 'Sac criado com sucesso!');
    //     this.router.navigate(['sac']);
    //   },
    //   complete: () => {},
    // });
  };
}
