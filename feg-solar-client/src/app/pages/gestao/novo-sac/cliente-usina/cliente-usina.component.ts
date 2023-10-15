import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ClientesController } from "src/app/core/controllers/clientes/clientes.controller";
import { ProjetosController } from "src/app/core/controllers/projetos/projetos.controller";

@Component({
  selector: "feg-cliente-usina",
  templateUrl: "./cliente-usina.component.html",
})
export class ClienteUsinaComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  constructor(
    private clientesController: ClientesController,
    private projetosController: ProjetosController
  ) { }
  stepOne: boolean = false;
  customers: any[] = [];
  factorys: any[] = [];
  customer: any;
  factory: any;
  nextStep: boolean = false;
  optionDigit: boolean = false;

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes = () => {
    this.clientesController.getAll().subscribe({
      next: (resp: any) => {
        this.customers = resp.data.map((m: any) => m.customer);
        let op = {
          corporateName: 'Digitar',
          id: 0
        }
        this.customers.push(op)
      },
    });
  };

  getAllProjetos = () => {
    if (this.customer.id == 0) {
      this.optionDigit = true;
    } else {
      this.optionDigit = false;
      this.projetosController.getByCustomer(this.customer.id).subscribe({
        next: (resp) => {
          this.factorys = resp.data.map((m: any) => m.project);
        },
      });
    }

  };

  avancar = () => {
    let data = {
      customer: this.customer,
      factory: this.factory
    }
    this.nextStep = true
    this.onSave.emit(data);
  }

}
