import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { Router } from '@angular/router';
import { AbaFormService } from 'src/app/core/services/aba-form.service';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-sacs',
  templateUrl: './sacs.component.html',
})
export class SacsComponent implements OnInit {
  @ViewChild('cgc') cgc: any;
  data: any[] = [];
  sacSelected: any = null;
  menuSelecao: any;
  formFilter!: UntypedFormGroup;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    public abaFormService: AbaFormService,
    private sacsController: SacsController,
  ) {}

  ngOnInit(): void {
    this.getSacs();
    this.createFilterForm();
  }
  
  createFilterForm = () => {
    this.formFilter = this.fb.group({
      search: [""],
    });
  };

  search = (tb1: any) => {
    tb1.filterGlobal(this.formFilter.value.search, "contains");
  };

  novo = async () => {
    
    this.router.navigate(["sac/new"]);
  };

  createMenuItem = async (event: any, data: any) => {
    debugger
    const menuItem = [
      {
        label: `Ver Histórico`,
        command: () => {
          this.cgc.hide();
          debugger;
          this.abaFormService.setParams({ id: data.id });
          this.router.navigate([`sac/view/${data.id}`]);
        },
      },
    ];
    this.menuSelecao = {
      data,
      menuItem,
    };
    this.cgc.toggle(event);
  };

  getSacs = () => {
    this.sacsController.getById().subscribe({
      next: (resp) => {
        this.data = resp.data
      },
      complete: () => {},
    });
  };
}
