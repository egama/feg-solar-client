import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AbaFormService } from "src/app/core/services/aba-form.service";
import { MenuService } from "src/app/core/services/menu.service";

@Component({
  selector: "feg-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit, AfterViewInit {
  active = false;
  menuSourceSubscription: Subscription;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private abaFormService: AbaFormService
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (key) => (this.active = key)
    );
  }

  clickIconMenu = () => {
    this.menuService.toggleMenu();
  };

  originalMenu: any[] = [];
  menu: any[] = [];
  ngOnInit(): void {
    this.menu = this.menuService.menu;
    this.originalMenu = JSON.parse(JSON.stringify(this.menuService.menu));
  }

  ngAfterViewInit(): void {
    const url = this.router.url;
    const splt = (url || "").split("/");

    splt.splice(0, 1);
    this.setMenuOpenInitial(splt, this.menu);
  }

  setMenuOpenInitial = (splt: any[], itemsMenu: any[]) => {
    const idx = itemsMenu.findIndex((im) => im.url == `/${splt[0]}`);
    if (idx >= 0) {
      itemsMenu[idx].active = true;
      if (
        itemsMenu[idx].children &&
        itemsMenu[idx].children.length > 0 &&
        splt.length > 1
      ) {
        splt.splice(0, 1);

        this.setMenuOpenInitial(splt, itemsMenu[idx].children);
      }
    }
  };

  clickMenu(e: any, item: any, ...m: any) {
    e.preventDefault();
    e.stopPropagation();
    
    if (item.type == 1) {
      //Folder, deve abrir apenas
      item.active = !item.active;
    } else if (item.type == 2) {
      let url = `${(m || []).map((_m: any) => _m.url).join("")}${item.url}`;
      //Url, deve redirecionar
      
      if (this.abaFormService.abaForm) {
        
        this.abaFormService.closeConfirm(() => {
          this.executeClick(url);
        });
      } else this.executeClick(url);
    }
  }

  executeClick = (url: string) => {
    
    this.router.navigate([url]);
    this.menuService.toggleMenu();

    this.menu = JSON.parse(JSON.stringify(this.originalMenu));

    const splt = (url || "").split("/");
    splt.splice(0, 1);
    this.setMenuOpenInitial(splt, this.menu);
  };
}
