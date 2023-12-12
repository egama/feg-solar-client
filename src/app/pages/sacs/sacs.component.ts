import { Component, OnInit, ViewChild } from '@angular/core';
import { SacsController } from 'src/app/core/controllers/sacs/sacs.controller';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sacs',
  templateUrl: './sacs.component.html',
})
export class SacsComponent implements OnInit {
  @ViewChild("cgc") cgc: any;
  data: any[] = [];
  sacSelected: any = null
  menuSelecao: any;

  constructor(
    private sacsController: SacsController,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.getSacs();
  }

  createMenuItem = async (event: any, data: any) => {
    const menuItem = [
      {
        label: `Ver Histórico`,
        command: () => {
          this.cgc.hide();
          this.router.navigate([`sac/view/${data.Sac.id}`]);
        },
      },
    ];

    this.menuSelecao = {
      data,
      menuItem,
    };

    this.cgc.toggle(event);
  };

  // verSac = (data: any) => {
  //   debugger
  //     this.router.navigate([`sac/view/${data.Sac.id}`]);
  
  // };

  getSacs = () => {
    this.sacsController.getById().subscribe({
      next: (resp) => {
        if (Array.isArray(resp)) {
          this.data = resp;
          this.sacSelected = this.data
          console.log(this.data)
        } else {
          this.data = [resp];
          this.sacSelected = this.data
          console.log(this.data)
        }
        console.log(this.data)
      },
      complete: () => {},
    });
  };
}
