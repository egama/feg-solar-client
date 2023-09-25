import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthController } from "src/app/core/controllers/auth/auth.controller";
import { MessageService } from "src/app/core/services/messageService";

@Component({
  selector: "app-cadastro",
  templateUrl: "./reset-password.component.html",
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private _router: Router,
    private fb: UntypedFormBuilder,
    private authController: AuthController,
    private messageService: MessageService
  ) {}

  showSuccessEmail: boolean = false;
  loading = false;

  ngOnInit(): void {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
    });
  };

  form!: UntypedFormGroup;

  reset = () => {
    this.loading = true;
    this.authController.esqueciSenha(this.form.value.email).subscribe({
      next: (resp: any) => {
        this.showSuccessEmail = true;
        this.messageService.success("Sucesso", "E-mail enviado com sucesso!");
        this.loading = false;
      },
      error: (resp: any) => {
        this.loading = false;
      },
    });
  };

  enter(event: any) {
    if (event.keyCode == 13 && this.form.value.email != "") {
      this.reset();
    }
  }
}
