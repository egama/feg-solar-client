// import { localePT } from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";
import { PrimeNGModules } from "src/app/core/modules/primeng.modules";
import { CommonModules } from "src/app/common/common.module";
import { DirectivesModule } from "src/app/core/directives/directives.module";
import { TranslateModule } from "@ngx-translate/core";
import { MeusChamadosComponent } from "./meus-chamados/meus-chamados.component";
import { HomeComponent } from "./home.component";
import { AbrirRmaComponent } from "./abrir-rma/abrir-rma.component";
import { AbrirTicktComponent } from "./abrir-tickt/abrir-tickt.component";

registerLocaleData(localePT);

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {
      breadcrumb: "Home",
    },
    children: [
      // { path: "", redirectTo: "cadastrados", pathMatch: "full" },
      {
        path: "meus-chamados",
        component: MeusChamadosComponent,
        data: {
          breadcrumb: "Meus Chamados",
        },
      },
      {
        path: "abrir-rma",
        component: AbrirRmaComponent,
        data: {
          breadcrumb: "Abrir RMA",
        },
      },
      {
        path: "abrir-tickt",
        component: AbrirTicktComponent,
        data: {
          breadcrumb: "Abrir Tickt",
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    MeusChamadosComponent,
    AbrirRmaComponent,
    AbrirTicktComponent,
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
export class HomeModule {}
