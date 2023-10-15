import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GestaoRoutingModule } from "./gestao-routing.modules";

import { CommonModules } from "src/app/common/common.module";
import { TranslateModule } from "@ngx-translate/core";
import { PrimeNGModules } from "src/app/core/modules/primeng.modules";

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    CommonModules,
    ReactiveFormsModule,
    GestaoRoutingModule,
    PrimeNGModules,
    TranslateModule
  ],
  providers: [],
  exports: [],
})
export class GestaoModule {}
