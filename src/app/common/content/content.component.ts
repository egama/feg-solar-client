import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { AbaFormService } from "src/app/core/services/aba-form.service";
import { ModalConfirmType } from "../modais/confirm/confirm.type";

@Component({
  selector: "feg-content",
  templateUrl: "./content.component.html",
})
export class ContentComponent implements OnInit {
  @ViewChild("pagecontent", { static: true, read: ViewContainerRef })
  pagecontent?: ViewContainerRef;
  @ViewChild("mconf") mconf?: any;
  mobile?: boolean;

  constructor(
    public abaFormService: AbaFormService,
    private resolve: ComponentFactoryResolver
  ) {}

  @Input() items = [
    {
      code: "filial",
      label: "",
    },
  ];

  get showForm() {
    return this.abaFormService.abaForm;
  }

  ngOnInit(): void {
    this.abaFormService.abaSource.subscribe((next) => {
      if (next) {
        this.items[0] = next;

        this.injector(next.component, next.params, () => {});
      } else {
        this.exitClick();
      }
    });
  }

  modal = new ModalConfirmType();
  exitClick(): void {
    this.modal = {
      ...this.modal,
      title: "Você deseja sair desta tela?",
      subtitle: "Os dados preenchidos serão perdidos",
      actionPrimary: this.cancelExit,
      actionSecundary: this.confirmExit,
      labelPrimaryButton: "Não",
      labelSecundaryButton: "Sim",
    };
    this.mconf.openModal();
  }

  confirmExit = () => {
    this.abaFormService.closeConfirmed("exit");
  };

  cancelExit = () => {
    this.abaFormService.closeCanceled();
  };

  private _ref: any;
  injector = (component: any, params: any, subscribe: any) => {
    this.pagecontent && this.pagecontent.clear();

    this.abaFormService.setParams(params);

    const injected: Injector = Injector.create({
      providers: [{ provide: "dataInjection", useValue: params }],
    });
    const factory = this.resolve.resolveComponentFactory(component);
    this._ref = this.pagecontent?.createComponent(factory, 0, injected);

    (this._ref.instance as any).callbackInjection &&
      (this._ref.instance as any).callbackInjection.subscribe(subscribe);
  };
}
