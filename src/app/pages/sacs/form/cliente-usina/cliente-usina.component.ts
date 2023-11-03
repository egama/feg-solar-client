import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ClientesController } from 'src/app/core/controllers/clientes/clientes.controller';
import { ProjetosController } from 'src/app/core/controllers/projetos/projetos.controller';

@Component({
  selector: 'feg-cliente-usina',
  templateUrl: './cliente-usina.component.html',
})
export class ClienteUsinaComponent implements OnInit {
  @Input() form!: FormGroup | AbstractControl;

  @Output() onSave = new EventEmitter();

  constructor(
    private clientesController: ClientesController,
    private projetosController: ProjetosController
  ) {}

  optionsCustomers: any[] = [];
  optionsProjects: any[] = [];

  page: 'view' | 'edit' = 'edit';

  stepOne: boolean = false; //remover
  customer: any; //reover
  factory: any; //remover

  nextStep: boolean = false; //remover

  ngOnInit() {
    this.getAllClientes();

    console.log(this.form);
  }

  getAllClientes = () => {
    this.clientesController.getAll().subscribe({
      next: (resp: any) => {
        this.optionsCustomers = resp.data.map((m: any) => m.customer);
      },
    });
  };

  getAllProjetos = () => {
    this.projetosController.getByCustomer(this.customer.id).subscribe({
      next: (resp) => {
        this.optionsProjects = resp.data.map((m: any) => m.project);
      },
    });
  };

  avancar = () => {
    let data = {
      customer: this.customer,
      factory: this.factory,
    };
    this.nextStep = true;
    this.onSave.emit(data);
  };
}
