import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

interface IItemTabs {
  code: string;
  label: string;
  component: any;
  params?: any;
  callback?: (e: { event: string; data: any }) => void;
}

@Injectable({ providedIn: "root" })
export class AbaFormService {
  public abaSource = new Subject<IItemTabs | null>();
  public abaForm: boolean = false;
  private params: any;
  private callBack?: (e: any) => void;

  setParams(params: any) {
    this.params = params;
  }

  getParams(): any {
    return this.params;
  }

  enable = (item: IItemTabs): void => {
    this.abaForm = true;
    this.callBack = item.callback;
    this.abaSource.next(item);
  };

  confirmAction?: () => void;
  cancelAction?: () => void;
  closeConfirm = (
    confirmAction?: () => void,
    cancelAction?: () => void
  ): void => {
    this.confirmAction = confirmAction;
    this.cancelAction = cancelAction;

    this.abaSource.next(null);
  };

  close = (event?: string, dataCallBack?: any) => {
    this.abaForm = false;
    this.callBack && this.callBack({ event, data: dataCallBack });
  };

  closeConfirmed = (event?: string, dataCallBack?: any): void => {
    if (this.confirmAction) {
      this.confirmAction();
      this.confirmAction = undefined;
    }
    this.close(event, dataCallBack);
  };

  closeCanceled = (): void => {
    if (this.cancelAction) {
      this.cancelAction();
      this.cancelAction = undefined;
    }
  };
}
