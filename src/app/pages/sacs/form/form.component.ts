import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StepScreen } from './form.types';

@Component({
  selector: 'feg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}

  form!: UntypedFormGroup;
  stepAtual: number = 1;

  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      customer: this.fb.group({
        customerId: [null, [Validators.required]],
        projectsId: [null, [Validators.required]],
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
  };
}
