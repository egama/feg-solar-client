import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedrouter: ActivatedRoute
  ) {
    this.activatedrouter.params.subscribe((params) => {
      
      if (params && params['id']) this.id = params['id'];
    });
  }

  form!: UntypedFormGroup;
  data: any;
  id: number = 0;

  ngOnInit() {
    this.getSacById();
  }

  getSacById = () => {
    this.sacsController.getSacById(this.id).subscribe({
      next: (resp: any) => {
        this.data = resp;
      },
    });
  };

  voltar = () => {
    this.router.navigate(['sac']);
  };
}
