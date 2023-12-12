import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepScreen } from '../form.types';

@Component({
  selector: 'feg-tipo-atendimento',
  templateUrl: './tipo-atendimento.component.html',
})
export class TipoAtendimentoComponent implements OnInit {
  @Input() form!: any;
  @Input() allData!: any;
  @Input() tipoAtendimentoData!: any;
  @Output() onSave = new EventEmitter();
  @Output() onEditInProgress = new EventEmitter();

  optionsTipoAtendimento: any[] = [
    { id: 1, name: 'RMA', value: 'rma' },
    { id: 2, name: 'Suporte Técnico', value: 'ste' },
  ];
  selectedTipoAtendimento: any;
  page: 'view' | 'edit' = 'edit';

  constructor() {}
  ngOnInit() {
    debugger;
    this.page = 'edit';
    this.oldVersion = this.form.value;
    this.enableField(true);
    if (this.allData[0].data.customerId === this.allData[0].old.customerId) {
      if (this.allData[1]) {
        this.allData[0].equal == true
          ? this.form.controls['atttId'].setValue(this.allData[1].data.atttId)
          : this.form.controls['atttId'].setValue({});
      }
    } else {this.form.controls['atttId'].reset()}
    
  }

  oldVersion: any = null;
  editar = () => {
    this.page = 'edit';
    this.enableField(true);
    this.oldVersion = this.form.value;
  };

  enableField = (value: boolean) => {
    if (value) {
      this.form.controls['atttId'].enable();
    } else {
      this.form.controls['atttId'].disable();
    }
  };

  avancar = () => {
    this.page = 'view';
    this.oldVersion == null ? (this.oldVersion = this.form.value) : '';
    let equal: boolean = false;
    this.oldVersion === this.form.value ? (equal = !equal) : '';
    this.enableField(false);
    [this.onEditInProgress.emit({ step: StepScreen.TIPO_ATEMDIMENTO })];
    this.onSave.emit({
      data: this.form.value,
      step: StepScreen.TIPO_ATEMDIMENTO,
      equal: equal,
    });
  };
}
