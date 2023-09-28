import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
  
  @Component({
    selector: "app-meus-chamados",
    templateUrl: "./meus-chamados.component.html",
  })
  export class MeusChamadosComponent implements OnInit {
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

    card = [
      {name: 'card 1', id: 1},
      {name: 'card 2', id: 1},
      {name: 'card 3', id: 1},
      {name: 'card 4', id: 1},
      {name: 'card 5', id: 1},
      {name: 'card 6', id: 1},
      {name: 'card 7', id: 1},
      {name: 'card 8', id: 1},
      {name: 'card 9', id: 1},
    ]
  
  }
  