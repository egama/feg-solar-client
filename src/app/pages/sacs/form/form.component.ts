import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'feg-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}

  form!: UntypedFormGroup;

  createForm = () => {
    this.form = this.fb.group({
      customer: this.fb.group({
        customerId: [null],
        projectsId: [null],
      }),
      attendance: this.fb.group({
        atttId: [null]
      }),
    });
  };

  getFormChild = (name: string) => {
    return this.form.controls[name];
  };
  getFormAttendance = (name: string) => {
    return this.form.controls[name];
  };

  stepOne: boolean = false;
  AllData: any;
  stepTwo: boolean = false;
  stepThree: boolean = false;

  ngOnInit() {
    this.createForm();
  }

  nextStep = (data: any) => {
    if (!this.stepOne) {
      this.AllData = data;
      this.stepOne = true;
    }
    if (!this.stepTwo && this.stepOne) {
      this.stepTwo = true;
    } else if (this.stepTwo && !this.stepThree) {
      if (data.tipo) {
        debugger;
        this.AllData = {
          ...this.AllData,
          tipo: data.tipo,
        };
      }
      this.stepThree = true;
    }
  };
}
