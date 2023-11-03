import { Component, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "feg-over-list",
  templateUrl: "./over-list.component.html",
})
export class OverListComponent implements OnInit {
  @ViewChild("opli") opli: any;
  constructor() {}

  @Input() data: Array<{
    icon?: string;
    image?: string;
    label: string;
    command: (e: any) => void;
  }> = [];

  ngOnInit(): void {}

  toggle = (event: any) => {
    this.opli.toggle(event);
  };

  hide = () => {
    this.opli.hide();
  };
  
  show = () => {
    this.opli.show();
  };
}
