// local imports
import { Model } from "./model";
import View from "./view";

import "./displayview.css";

export class displayView implements View {
  //#region observer pattern

  update(): void {
    // this.container.removeChild(this.displayshape);
    if (this.model.numSelected == 1 && this.model.selectID) {
        const shape = this.model.shape(this.model.selectID);
        if (shape) {
            this.displayshape.style.backgroundColor = `hsl(${shape.hue1}deg 100% 50%)`;
            this.displayshape.style.width = this.displayshape.style.height;
            this.container.style.display = "flex";
        }
    } else {
        this.container.style.display = "none";
    }
  }

  //#endregion

  // the actual HTML element hosting this view
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }
  private displayshape: HTMLDivElement;

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.id = "display";
    this.displayshape = document.createElement("div");
    this.displayshape.id = "displayshape";
    if (!this.model.selectID) return;
    let hue1 = this.model.shape(this.model.selectID)?.hue1;
    this.displayshape.style.backgroundColor = `hsl(${hue1}deg 100% 50%)`;
    this.displayshape.style.width = this.displayshape.style.height;
    this.container.appendChild(this.displayshape);
    // register with the model
    this.model.addObserver(this);
  }
}
