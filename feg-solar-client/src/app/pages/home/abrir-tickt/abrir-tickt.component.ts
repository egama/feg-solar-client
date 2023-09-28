import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
  
  @Component({
    selector: "feg-abrir-tickt",
    templateUrl: "./abrir-tickt.component.html",
  })
  export class AbrirTicktComponent implements OnInit {
    constructor(
      private fb: UntypedFormBuilder,
    ) {}

    form!: UntypedFormGroup;
  
    ngOnInit(): void {
      this.createForm();
    }
  
    createForm = () => {
      this.form = this.fb.group({
      });
    };
  
  }
  