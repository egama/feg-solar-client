import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientesController } from 'src/app/core/controllers/clientes/clientes.controller';
import { ProjetosController } from 'src/app/core/controllers/projetos/projetos.controller';
import { StepScreen } from '../form.types';

@Component({
  selector: 'feg-cliente-usina',
  templateUrl: './cliente-usina.component.html',
})
export class ClienteUsinaComponent implements OnInit {
  @Input() form!: any;
  @Output() onSave = new EventEmitter();
  @Output() onEditInProgress = new EventEmitter();

  constructor(
    private clientesController: ClientesController,
    private projetosController: ProjetosController
  ) {}

  optionsCustomers: any[] = [];
  optionsProjects: any[] = [];
  selectedCustomer: any;
  selectedFactory: any;
  oldVersion: any = null;

  page: 'view' | 'edit' = 'edit';

  ngOnInit() {
    this.getAllClientes();
  }

  onCustomerClear() {
    this.form.controls['projectsCompanyId'].reset();
    this.form.controls['customerId'].reset();
    this.selectedCustomer = null;
    this.selectedFactory = null;
  }

  getAllClientes = () => {
    this.clientesController.getAll().subscribe({
      next: (resp: any) => {
        this.optionsCustomers = resp.data.map((m: any) => m.customer);
      },
    });
  };

  editar = () => {
    this.page = 'edit';
    this.enableField(true);
    this.oldVersion = this.form.value;
    this.onEditInProgress.emit({ step: StepScreen.CLIENTE });
  };

  enableField = (value: boolean) => {
    if (value) {
      this.form.controls['customerId'].enable();
      this.form.controls['projectsCompanyId'].enable();
    } else {
      this.form.controls['customerId'].disable();
      this.form.controls['projectsCompanyId'].disable();
    }
  };

  onCustomerSelect(event: any) {
    if (event) {
      this.selectedCustomer = this.optionsCustomers.find(
        (x: any) => x.id == event
      );
      this.getAllProjetos();
    }
  }

  onFactorySelected(event: any) {
    this.selectedFactory = this.optionsProjects.find((x: any) => x.id == event);
  }

  getAllProjetos = () => {
    this.projetosController.getByCustomer(this.selectedCustomer.id).subscribe({
      next: (resp) => {
        this.optionsProjects = resp.data;
      },
    });
  };

  avancar = () => {
    this.page = 'view';
    this.oldVersion == null ? (this.oldVersion = this.form.value) : '';
    let equal: boolean = false;
    this.oldVersion === this.form.value ? (equal = !equal) : '';
    this.enableField(false);
    this.onSave.emit({
      old: this.oldVersion,
      data: this.form.value,
      step: StepScreen.CLIENTE,
      equal: equal,
    });
  };
}
