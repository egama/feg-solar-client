import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthController } from "src/app/core/controllers/auth/auth.controller";
import { AccessService } from "src/app/core/services/access.service";
import { MenuService } from "src/app/core/services/menu.service";
import { PerfilController } from "src/app/core/controllers/perfil/perfil.controller";
import { zip } from "rxjs";
import { PermissionService } from "src/app/core/services/permission.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private accessService: AccessService,
    private menuService: MenuService,
    private permissionService: PermissionService,
    private authController: AuthController,
    private perfilController: PerfilController,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      lembrar: [false],
    });
  };

  @ViewChild("mcnp") mcnp?: any;

  form!: UntypedFormGroup;

  loading = false;
  login = () => {
    debugger
    if (this.form.valid) {
      this.loading = true;
      this.authController
        .loginClient(this.form.value.email, this.form.value.password)
        .subscribe({
          next: (resp: any) => {
            if (resp.data) {
              this.accessService.access = resp.data;
              const zippi = zip(
                this.perfilController.getMenuByUser(),
                this.perfilController.getPermissionByUser()
              );
              zippi.subscribe({
                next: (rData) => {
                  this.menuService.menu = rData[0].data;
                  this.permissionService.permissions = rData[1].data;
                },
                complete: () => {
                  const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                      "redirectURL"
                    ) || this.menuService.menu[0].url;
                  this.router.navigate([redirectURL]);
                },
              });
            }
          },
        });
    }
  };

  enter(event: any) {
    if (
      event.keyCode == 13 &&
      this.form.value.email != "" &&
      this.form.value.password != ""
    ) {
      this.login();
    }
  }
}
