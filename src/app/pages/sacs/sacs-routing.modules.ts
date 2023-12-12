import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SacsComponent } from './sacs.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FormComponent } from './form/form.component';
import { VisualizarSacComponent } from './view/visualizar-chamado-sac.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Sac',
    },
    children: [
      {
        path: '',
        component: SacsComponent,
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Novo',
        },
        component: FormComponent,
      },
      // {
      //   path: 'view',
      //   data: {
      //     breadcrumb: 'Visualizar',
      //   },
      //   component: VisualizarSacComponent,
      // },
      {
        path: 'view',
        children: [
          { path: '', component: SacsComponent },
          {
            path: ':id',
            component: VisualizarSacComponent,
            data: {
              breadcrumb: 'Visualizar',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SacsRoutingModule {}
