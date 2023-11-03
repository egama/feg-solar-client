import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { TemplateComponent } from "./common/template/template.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/auth/auth.modules").then((x) => x.AuthModule),
      },

    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: TemplateComponent,
    children: [
      {
        path: "gestao",
        loadChildren: () =>
          import("./pages/gestao/gestao.modules").then(
            (x) => x.GestaoModule
          ),
      }
    ],
  },
  { path: "**", redirectTo: "portal/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
