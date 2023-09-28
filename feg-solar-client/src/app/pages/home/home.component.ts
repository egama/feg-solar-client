import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
  
  @Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
  })
  export class HomeComponent implements OnInit {
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
  