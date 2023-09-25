import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
  { path: "**", redirectTo: "portal/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
