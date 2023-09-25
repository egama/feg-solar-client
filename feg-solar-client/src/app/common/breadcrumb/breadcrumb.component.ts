import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccessService } from 'src/app/core/services/access.service';

@Component({
  selector: 'feg-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  nav: any[] = [];

  constructor(
    private router: Router,
    private accessService: AccessService,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((a: any) => {
        const bread = a?.snapshot?.routeConfig?.data?.breadcrumb;
        if (bread) this.nav.unshift(bread);
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((a: any) => {
        this.breadcrumb = this.nav;
        this.nav = [];
      });
  }

  breadcrumb: string[] = [];

  userName: string = '';
  companyName: string = '';
  ngOnInit(): void {
    this.userName = this.accessService.access.name;
    this.companyName = this.accessService.access.companyName;
  }
}
