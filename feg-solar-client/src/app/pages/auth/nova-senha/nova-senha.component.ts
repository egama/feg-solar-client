import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { EmpresasController } from "src/app/core/controllers/empresas/empresas.controller";
import { MessageService } from "src/app/core/services/messageService";
import { AuthController } from "src/app/core/controllers/auth/auth.controller";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-nova-senha",
  templateUrl: "./nova-senha.component.html",
})
export class NovaSenhaComponent implements OnInit {
  constructor(
    private _router: Router,
    private fb: UntypedFormBuilder,
    private empresasController: EmpresasController,
    private messageService: MessageService,
    private authController: AuthController,
    private route: ActivatedRoute
  ) { }

  formGroup!: UntypedFormGroup;
  loading = false;
  parametro: any;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parametro = params["key"]
    });
    this.authController.validateKey(this.parametro).subscribe((resp: any) => {

    });
    this.createForm();
    this.formGroup.get("confirmPassword")?.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }

  createForm = () => {
    this.formGroup = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  };

  passwordsError: boolean = true;

  validatePassword = (): boolean => {
    const newPassword = this.formGroup.get("newPassword")?.value;
    const confirmPassword = this.formGroup.get("confirmPassword")?.value;

    if (newPassword !== confirmPassword) {
      this.formGroup.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      this.passwordsError = false;
      return false;
    } else {
      this.formGroup.get("confirmPassword")?.setErrors(null);
      this.passwordsError = true;
      return true;
    }
  };

  submit = () => {
    if (!this.formGroup.valid) {
      this.messageService.error('Atenção', 'Preencha todos os campos')
    }
    else {
      const passW = this.formGroup.get("confirmPassword")?.value

      this.authController.novaSenha(this.parametro, passW).subscribe({
        next: () => {
          this._router.navigate(['/login'])
        }
      });
    }
  }
}
