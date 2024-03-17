// local imports
import View from "./view";
import { Model } from "./model";

import "./displayview.css";

export class displayView implements View {
  //#region observer pattern
  update(): void {
    const id = this.model.selectID;
    console.log(id);
    if (id != null) {
        const shape = this.model.shape(id);
        if (shape != null) {
          if (this.container.clientWidth !== 0 && this.container.clientHeight !== 0) {
            const size = Math.min(this.container.clientWidth, this.container.clientHeight);
            this.displayshape.style.width = `${size}px`;
            this.displayshape.style.height = `${size}px`;
          }
          this.displayshape.style.backgroundColor = `hsl(${shape.hue1}, 100%, 50%)`;
          this.container.style.display = "block";
        }
    } else {
      this.container.style.display = "none";
    }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }
  private displayshape: HTMLDivElement;

//   private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "display";
    this.container.style.display = "none";

    // then setup the widgets in the container
    this.displayshape = document.createElement("div");
    this.displayshape.id = "displayshape";
    
    this.container.appendChild(this.displayshape);
    // this.container.appendChild(this.select);

    // register with the model
    this.model.addObserver(this);
    this.update();
    window.addEventListener('load', () => this.update());
    window.addEventListener('resize', () => this.update());
  }
}
