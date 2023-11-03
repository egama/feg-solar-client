import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "feg-modal-view-image",
  templateUrl: "./view-image.component.html",
})
export class ModalViewImageComponent implements OnInit {
  constructor() {}

  @Input() title: string = "";
  @Input() image: string = "";

  tipoImage: "image" | "pdf" = "image";

  ngOnInit(): void {}

  displayModal = false;

  openModal = (image: string) => {
    this.displayModal = true;
    if (image) this.image = image;

    this.getTipoImage();
  };

  getTipoImage = () => {
    if ((this.image || "").slice(this.image.length - 3).toLowerCase() == "pdf")
      this.tipoImage = "pdf";
    else this.tipoImage = "image";
  };

  closeModal = () => (this.displayModal = false);
}
