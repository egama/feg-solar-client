// import { localePT } from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";
import { PrimeNGModules } from "src/app/core/modules/primeng.modules";
import { CommonModules } from "src/app/common/common.module";
import { PermissionGuard } from "src/app/core/guards/permissions.guard";
import { ENUM_MENU } from "src/app/core/enums/enum";
import { DirectivesModule } from "src/app/core/directives/directives.module";
import { TranslateModule } from "@ngx-translate/core";
import { NovoSacComponent } from "./novo-sac.component";
import { ClienteUsinaComponent } from "./cliente-usina/cliente-usina.component";
import { TipoAtendimentoComponent } from "./tipo-atendimento/tipo-atendimento.component";

registerLocaleData(localePT);

const routes: Routes = [
  {
    path: "",
    component: NovoSacComponent,
    canActivate: [PermissionGuard],
    data: {
      breadcrumb: "Novo Sac",
    },
  },
];

@NgModule({
  declarations: [
    NovoSacComponent,
    ClienteUsinaComponent,
    TipoAtendimentoComponent
  ],
  imports: [
    CommonModule,
    CommonModules,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(routes),
    PrimeNGModules,
    TranslateModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt-br" }],
  exports: [],
})
export class NovoSacModule {}
