import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeNGModules } from "src/app/core/modules/primeng.modules";
import { AuthRoutingModule } from "./auth-routing.modules";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { CommonModules } from "src/app/common/common.module";
import { NovaSenhaComponent } from "./nova-senha/nova-senha.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    ResetPasswordComponent,
    NovaSenhaComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModules,

    PrimeNGModules,
    TranslateModule
  ],
  providers: [],
  exports: [],
})
export class AuthModule {}
