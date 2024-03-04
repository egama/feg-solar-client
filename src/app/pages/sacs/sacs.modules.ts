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
import { VisualizarSacComponent } from './view/visualizar-chamado-sac.component';
import { FormDadosEnvioComponent } from './view/form-dados-envio/form-dados-envio.component';
import { FormPropostaComponent } from './view/form-proposta/form-proposta.component';
import { FormRespostasComponent } from './view/form-respostas/form-respostas.component';

@NgModule({
  declarations: [
    SacsComponent,
    FormComponent,
    EquipamentoComponent,
    ClienteUsinaComponent,
    FormPropostaComponent,
    VisualizarSacComponent,
    FormRespostasComponent,
    FormDadosEnvioComponent,
    TipoAtendimentoComponent,
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
