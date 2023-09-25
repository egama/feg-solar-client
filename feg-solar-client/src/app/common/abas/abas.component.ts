import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { AbaFormService } from "src/app/core/services/aba-form.service";
import { PermissionService } from "src/app/core/services/permission.service";

interface Option {
  label: string;
  labelMobile?: string;
  routerLink: string;
  permission?: string;
}

@Component({
  selector: "feg-abas",
  templateUrl: "./abas.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AbasComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() styleClass: string = "";
  @Input() routerIsActive: boolean = true;

  items: MenuItem[] = [];
  activeItem?: MenuItem;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private abaFormService: AbaFormService,
    private translateService: TranslateService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.prepareItem();

    this.route.url.subscribe(() => {
      const itemStr = this.route?.snapshot?.firstChild?.routeConfig?.path;
      if (itemStr) {
        this.activeItem = this.items.find((x) => x.url == itemStr);
      }
    });

    this.translateService.onLangChange.subscribe((resp: any) => {
      this.prepareItem();
    });
  }

  prepareItem = async () => {
    const options = this.options.filter(
      (f) =>
        !f.permission ||
        this.permissionService.permissions.find((a: any) => a == f.permission)
    );

    this.items = await Promise.all(
      options.map(async (o) => {
        return {
          label: await this.translateService.get(o.label).toPromise(),
          labelMobile: o.labelMobile,
          code: o.routerLink,
          url: o.routerLink,
          command: this.clickItem,
        };
      })
    );
  };

  oldItem?: MenuItem;
  clickItem = (e: any) => {
    e.originalEvent.preventDefault();
    this.activeItem = undefined;

    if (this.abaFormService.abaForm)
      this.abaFormService.closeConfirm(
        () => this.redirect(e),
        () => {
          this.activeItem = this.oldItem;
        }
      );
    else this.redirect(e);
  };

  redirect = (e: any) => {
    this.activeItem = e.item;
    this.oldItem = e.item;

    e.item.url &&
      this._router.navigate([e.item.url], { relativeTo: this.route });
  };
}
