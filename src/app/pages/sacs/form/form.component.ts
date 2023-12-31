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
  allData: any[] = [];
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
      hardwareProjects: this.fb.group({
        tipoEqp: [[null], [Validators.required]],
        eqp: [[null], [Validators.required]],
        eqpText: [null, [Validators.required]],
        answer: this.fb.array([]),
      }),
    });
  };

  get hardwareProjects(): FormArray {
    return this.form.get('answer') as FormArray;
  }

  getFormChild = (name: string) => {
    return this.form.controls[name];
  };
  getFormAttendance = (name: string) => {
    return this.form.controls[name];
  };

  getFormHardware = (name: string) => {
    return this.form.controls[name];
  };

  onEditInProgress = (data: any) => {
    this.stepAtual = data.step;
  };

  tipoAtendimentoData: any[] = [];

  nextStep = (data: any) => {
    if (data.step == 1 && !data.equal) {
      this.allData[0] = data;
    } else {
      this.allData.push(data);
    }
    if (data.step == 2 && !data.equal) {
      this.allData[1] = data;
    }
    if (data.step == 3 && !data.equal) {
      this.allData[2] = data;
    }
    this.stepAtual = data.step + 1;
    if (this.stepAtual <= (StepScreen.EQUIPAMENTOS as number) && data.dirty) {
      // this.form.controls['hardwareProjects'].setValue([]);
    }
  };
}
