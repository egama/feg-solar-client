import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { AbaFormService } from 'src/app/core/services/aba-form.service';

@Component({
  selector: 'feg-visualizar-sac',
  templateUrl: './visualizar-chamado-sac.component.html',
})
export class VisualizarSacComponent implements OnInit {

  constructor(
    private sacsController: SacsController,
    public abaFormService: AbaFormService,
    private router: Router,
  ) {}
  
  form!: UntypedFormGroup;
  data: any;

  ngOnInit() {
    const param = this.abaFormService.getParams();
      this.getSacById(param?.id);
  }

  getSacById = (id: number) => {
    this.sacsController.getSacById(id).subscribe({
      next: (resp: any) => {
        this.data = resp;
      },
    });
  };

  voltar = () => {
    this.router.navigate(["sac"]);
  };
}
