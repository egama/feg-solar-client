import { Directive, ElementRef, Input } from "@angular/core";
import { PermissionService } from "../services/permission.service";

@Directive({
  selector: "[fegPermission]",
})
export class FegPermissionDirective {
  @Input() fegPermission: string[] = [];

  constructor(
    private el: ElementRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.permissionService.check(this.fegPermission).subscribe({
      next: (resp) => {
        if (!resp) this.el.nativeElement.remove();
      },
    });
  }
}
