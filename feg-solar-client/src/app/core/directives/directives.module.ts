import { NgModule } from "@angular/core";
import { FegPermissionDirective } from "./permission.directive";

@NgModule({
  declarations: [FegPermissionDirective],
  exports: [FegPermissionDirective],
})
export class DirectivesModule {}
