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

@Component({
  selector: 'app-sacs',
  templateUrl: './sacs.component.html',
})
export class SacsComponent implements OnInit {
  @ViewChild('cgc') cgc: any;
  data: any[] = [];
  sacSelected: any = null;
  menuSelecao: any;

  constructor(
    private sacsController: SacsController,
    private router: Router,
    public abaFormService: AbaFormService
  ) {}

  ngOnInit(): void {
    this.getSacs();
  }

  createMenuItem = async (event: any, data: any) => {
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
        if (Array.isArray(resp)) {
          this.data = resp;
          this.sacSelected = this.data;
        } else {
          this.data = [resp];
          this.sacSelected = this.data;
        }
      },
      complete: () => {},
    });
  };
}
