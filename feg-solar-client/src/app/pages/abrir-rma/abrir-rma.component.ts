import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
  
  @Component({
    selector: "app-meus-chamados",
    templateUrl: "./abrir-rma.component.html",
  })
  export class AbrirRmaComponent implements OnInit {
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
  