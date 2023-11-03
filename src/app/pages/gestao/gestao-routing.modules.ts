import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    data: {
      breadcrumb: "Gestão",
    },
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "novo-sac",
      },
      {
        path: "novo-sac",
        loadChildren: () =>
          import("./novo-sac/novo-sac.module").then((m) => m.NovoSacModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestaoRoutingModule {}
