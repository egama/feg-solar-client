import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

export class ModalConfirmType {
  constructor(data?: any) {
    this.title = data?.title;
    this.subtitle = data?.subtitle;
    this.actionPrimary = data?.actionPrimary;
    this.actionSecundary = data?.actionSecundary;
    this.labelPrimaryButton = data?.labelPrimaryButton || "Confirmar";
    this.labelSecundaryButton = data?.labelSecundaryButton || "Cancelar";
  }

  title: string;
  subtitle?: string;
  data?: any;
  callbackSuccess?: any;
  actionPrimary: () => void;
  actionSecundary: () => void;

  labelPrimaryButton: string;
  labelSecundaryButton: string;
}
