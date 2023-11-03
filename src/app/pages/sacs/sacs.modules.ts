import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModules } from 'src/app/core/modules/primeng.modules';
import { CommonModules } from 'src/app/common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { SacsComponent } from './sacs.component';
import { SacsRoutingModule } from './sacs-routing.modules';
import { ClienteUsinaComponent } from './form/cliente-usina/cliente-usina.component';
import { EquipamentoComponent } from './form/equipamento/equipamento.component';
import { TipoAtendimentoComponent } from './form/tipo-atendimento/tipo-atendimento.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    SacsComponent,
    ClienteUsinaComponent,
    EquipamentoComponent,
    TipoAtendimentoComponent,
    FormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SacsRoutingModule,
    CommonModules,

    PrimeNGModules,
    TranslateModule,
  ],
  providers: [],
  exports: [],
})
export class SacsModule {}
