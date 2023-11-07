import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private projetosController: ProjetosController,
    private fb: FormBuilder
  ) {}

  optionsCustomers: any[] = [];
  optionsProjects: any[] = [];
  selectedCustomer: any;
  selectedFactory: any;
  selectedCustomerId: any;
  isEditing: boolean = true;
  public registerForm!: FormGroup;

  page: 'view' | 'edit' = 'edit';

  customer: any; //reover
  factory: any; //remover


  ngOnInit() {
    this.getAllClientes();
    this.initForm();
  }

  initForm = () => {
    this.registerForm = this.fb.group({
      idCustomer: [null, [Validators.required]],
      idProject: [null, [Validators.required]],
    });
  };

  onCustomerClear() {
    this.registerForm.controls['idProject'].reset();
    this.selectedFactory = null;
  }

  getAllClientes = () => {
    debugger;
    this.clientesController.getAll().subscribe({
      next: (resp: any) => {
        this.optionsCustomers = resp.data.map((m: any) => m.customer);
      },
    });
  };

  editar = () => {
    this.isEditing = true;
    this.registerForm.controls['idCustomer'].enable();
    this.registerForm.controls['idProject'].enable();
  };

  selectedClien: any;
  onCustomerSelect(event: any) {
    this.selectedCustomer = event;
    this.selectedCustomerId = event.id;
    this.getAllProjetos();
  }

  onFactorySelected(event: any) {
    this.selectedFactory = event;
  }

  getAllProjetos = () => {
    debugger;
    this.projetosController.getByCustomer(this.selectedCustomerId).subscribe({
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
    this.isEditing = false;
    this.registerForm.controls['idCustomer'].disable();
    this.registerForm.controls['idProject'].disable();
    this.onSave.emit(data);
  };
}
