import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginTemplateComponent } from "./login-template/login-template.component";
import { PrimeNGModules } from "../core/modules/primeng.modules";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { TemplateComponent } from "./template/template.component";
import { NavbarLogonComponent } from "./template/navbar-logon/navbar-logon.component";
import { NavbarComponent } from "./template/navbar/navbar.component";
import { SidebarComponent } from "./template/sidebar/sidebar.component";
import { ContentComponent } from "./content/content.component";
import { ModalConfirmComponent } from "./modais/confirm/confirm.component";
import { ModalViewImageComponent } from "./modais/view-image/view-image.component";
import { AbasComponent } from "./abas/abas.component";
import { FooterComponent } from "./template/footer/footer.component";
import { TranslateModule } from "@ngx-translate/core";
import { OverListComponent } from "./over-list/over-list.component";

@NgModule({
  declarations: [
    LoginTemplateComponent,
    BreadcrumbComponent,
    TemplateComponent,
    SidebarComponent,
    NavbarComponent,
    NavbarLogonComponent,
    ContentComponent,
    AbasComponent,
    ModalConfirmComponent,
    ModalViewImageComponent,
    FooterComponent,
    OverListComponent,
  ],
  imports: [RouterModule, PrimeNGModules, TranslateModule],
  exports: [
    LoginTemplateComponent,
    BreadcrumbComponent,
    TemplateComponent,
    SidebarComponent,
    NavbarComponent,
    NavbarLogonComponent,
    ContentComponent,
    AbasComponent,
    ModalConfirmComponent,
    ModalViewImageComponent,
    FooterComponent,
    OverListComponent
  ],
})
export class CommonModules {}
