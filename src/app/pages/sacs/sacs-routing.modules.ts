import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SacsComponent } from './sacs.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FormComponent } from './form/form.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class SacsRoutingModule {}
