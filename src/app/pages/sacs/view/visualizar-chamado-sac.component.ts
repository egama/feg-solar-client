import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientesController } from 'src/app/core/controllers/clientes/clientes.controller';
import { ProjetosController } from 'src/app/core/controllers/projetos/projetos.controller';
import { StepScreen } from '../form/form.types';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';

@Component({
  selector: 'feg-visualizar-sac',
  templateUrl: './visualizar-chamado-sac.component.html',
})
export class VisualizarSacComponent implements OnInit {
  @Input() form!: any;
  @Output() onSave = new EventEmitter();
  @Input() allData!: any;
  @Output() onEditInProgress = new EventEmitter();

  constructor(
    private sacsController: SacsController,
    private projetosController: ProjetosController,
    private fb: UntypedFormBuilder
  ) {}

  optionsCustomers: any[] = [];
  optionsProjects: any[] = [];
  selectedCustomer: any;
  selectedFactory: any;
  oldVersion: any = null;

  ngOnInit() {
    this.getSacById();
    this.createForm();
  }
  
  createForm = () => {
    this.form = this.fb.group({
        customerId: [null],
        projectsId: [null],
        atttId: [null],
        tipoEqp: [null],
        eqp: [null],
        eqpText: [null],
        answer: this.fb.array([]),
    });
  };

  getSacById = () => {
    this.sacsController.getSacById(this.form.projectsId).subscribe({
      next: (resp: any) => {
        this.optionsCustomers = resp.data.map((m: any) => m.customer);
      },
    });
  };

  enableField = (value: boolean) => {
    if (value) {
      this.form.controls['customerId'].enable();
      this.form.controls['projectsId'].enable();
    } else {
      this.form.controls['customerId'].disable();
      this.form.controls['projectsId'].disable();
    }
  };

  getAllProjetos = () => {
    this.projetosController.getByCustomer(this.selectedCustomer.id).subscribe({
      next: (resp) => {
        this.optionsProjects = resp.data.map((m: any) => m.project);
      },
    });
  };
}
