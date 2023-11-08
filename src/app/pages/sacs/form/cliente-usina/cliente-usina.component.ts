import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientesController } from 'src/app/core/controllers/clientes/clientes.controller';
import { ProjetosController } from 'src/app/core/controllers/projetos/projetos.controller';

@Component({
  selector: 'feg-cliente-usina',
  templateUrl: './cliente-usina.component.html',
})
export class ClienteUsinaComponent implements OnInit {
  @Input() form!: any;
  @Output() onSave = new EventEmitter();

  constructor(
    private clientesController: ClientesController,
    private projetosController: ProjetosController,
  ) {}

  optionsCustomers: any[] = [];
  optionsProjects: any[] = [];
  selectedCustomer: any;
  selectedFactory: any;

  page: 'view' | 'edit' = 'edit';

  ngOnInit() {
    this.getAllClientes();
  }

  onCustomerClear() {
    this.form.controls['projectsId'].reset();
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
    this.form.controls['customerId'].enable();
    this.form.controls['projectsId'].enable();
  };

  onCustomerSelect(event: any) {
    this.selectedCustomer = this.optionsCustomers.find((x: any) => x.id == event);
    this.getAllProjetos();
    console.log(this.selectedCustomer)
  }

  onFactorySelected(event: any) {
    this.selectedFactory = this.optionsProjects.find((x: any) => x.id == event);
  }

  getAllProjetos = () => {
    this.projetosController.getByCustomer(this.selectedCustomer.id).subscribe({
      next: (resp) => {
        this.optionsProjects = resp.data.map((m: any) => m.project);
      },
    });
  };

  avancar = () => {
    this.page = 'view';
    this.form.controls['customerId'].disable();
    this.form.controls['projectsId'].disable();
    this.onSave.emit(this.form);
  };
}
