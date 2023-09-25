import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { EmpresasController } from "src/app/core/controllers/empresas/empresas.controller";
import { MessageService } from "src/app/core/services/messageService";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
})
export class CadastroComponent implements OnInit {
  constructor(
    private _router: Router,
    private fb: UntypedFormBuilder,
    private empresasController: EmpresasController,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.createForm();
    this.form.get("confirmPassword")?.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }

  createForm = () => {
    this.form = this.fb.group({
      contactName: ["", [Validators.required]],
      contactEmail: ["", [Validators.required]],
      cnpj: ["", [Validators.required]],
      corporateName: ["", [Validators.required]],
      fantasyName: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      contactPassword: ["", [Validators.required]],
      plansId: [1],
    });
  };

  @ViewChild("mcnp") mcnp?: any;

  form!: UntypedFormGroup;

  passwordsMatch: boolean = true;

  validatePassword = (): boolean => {
    const contactPassword = this.form.get("contactPassword")?.value;
    const confirmPassword = this.form.get("confirmPassword")?.value;

    if (contactPassword !== confirmPassword) {
      this.form.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      this.passwordsMatch = false;
      return false;
    } else {
      this.form.get("confirmPassword")?.setErrors(null);
      this.passwordsMatch = true;
      return true;
    }
  };

  loading = false;
  cadastrar = () => {
    if (!this.form.valid) {
      this.messageService.error("Atenção", "Preencher todos os campos corretamente!");
      return;
    } else if (!this.passwordsMatch) {
      this.messageService.error("Atenção", "As senhas não coincidem!");
      return;
    }

    this.loading = true;
    this.empresasController.create(this.form.value).subscribe({
      next: (resp: any) => {
        this.loading = false;
        this.messageService.success("Sucesso", "Cadastro realizado com sucesso!");
        this._router.navigate(["/login"]);
      },
      error: (e: any) => {
        this.loading = false;

      }
    });
  };
}
