import { Injectable } from '@angular/core';
import { MessageService as MS } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private messageService: MS) {}

  success = (title: string, message: string, key: string = 'padrao') => {
    this.messageService.add({
      key,
      severity: 'success',
      summary: title,
      detail: message,
    });
  };

  error = (title: string, message: string, key: string = 'padrao') => {
    this.messageService.add({
      key,
      severity: 'error',
      summary: title,
      detail: message,
    });
  };

  warning = (title: string, message: string, key: string = 'padrao') => {
    this.messageService.add({
      key,
      severity: 'warn',
      summary: title,
      detail: message,
    });
  };
}
