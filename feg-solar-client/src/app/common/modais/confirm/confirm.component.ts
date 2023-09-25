import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalConfirmType } from "./confirm.type";

@Component({
  selector: "feg-modal-confirm",
  templateUrl: "./confirm.component.html",
})
export class ModalConfirmComponent implements OnInit {
  constructor() {}

  @Input() data: ModalConfirmType = new ModalConfirmType();

  // @Output() onPrimaryClick = new EventEmitter();
  // @Output() onSecundaryClick = new EventEmitter();

  ngOnInit(): void {}

  displayModal = false;

  openModal = () => (this.displayModal = true);

  closeModal = () => (this.displayModal = false);

  primaryClick = () => {
    this.closeModal();
    this.data && this.data.actionPrimary && this.data.actionPrimary();
  };

  secundaryClick = () => {
    this.closeModal();
    this.data && this.data.actionSecundary && this.data.actionSecundary();
  };
}
