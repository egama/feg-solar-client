import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { firstLoginComponent } from "./reset-password/reset-password.component";
import { LoginTemplateComponent } from "src/app/common/login-template/login-template.component";
import { NovaSenhaComponent } from "./nova-senha/nova-senha.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginTemplateComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "cadastro",
        component: CadastroComponent,
      },
      {
        path: "primeiro-acesso",
        component: firstLoginComponent,
      },
      {
        path: "nova-senha",
        component: NovaSenhaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class AuthRoutingModule {}
