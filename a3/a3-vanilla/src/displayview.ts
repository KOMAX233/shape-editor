// local imports
import View from "./view";
import { Model } from "./model";
import { shapelistView } from "./shapelistView";

import "./displayview.css";

export class displayView implements View {
  //#region observer pattern
  update(): void {
    this.container.replaceChildren();
    const id = this.model.selectID;
    // console.log(id);
    if (this.model.numSelected === 1) {
      if (!id) return;
        const shape = this.model.shape(id);
        if (shape != null) {
          if (this.container.clientWidth !== 0 && this.container.clientHeight !== 0) {
            const size = Math.min(this.container.clientWidth, this.container.clientHeight);
            this.displayshape.width = size;
            this.displayshape.height = size;
          }
          // this.displayshape.width = 100;
          // this.displayshape.height = 100;
          if (shape.drawing === "Square") {
            shapelistView.drawSquare(this.displayshape, shape);
          } else if (shape.drawing === "Star") {
            shapelistView.drawStar(this.displayshape, shape);
          } else if (shape.drawing === "Bullseye") {
            shapelistView.drawBull(this.displayshape, shape);
          } else if (shape.drawing === "Cat") {
            shapelistView.drawCat(this.displayshape, shape);
          }
          // this.displayshape.style.backgroundColor = `hsl(${shape.hue1}, 100%, 50%)`;
          this.container.appendChild(this.displayshape);
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
  private displayshape: HTMLCanvasElement;

//   private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "display";
    this.container.style.display = "none";

    // then setup the widgets in the container
    this.displayshape = document.createElement("canvas");
    this.displayshape.id = "displayshape";
    this.container.appendChild(this.displayshape);
    // this.container.appendChild(this.select);

    // register with the model
    this.model.addObserver(this);
    document.body.appendChild(this.container);
    this.displayshape.width = 150;
    this.displayshape.height = 150;
    this.update();
    window.addEventListener('load', () => this.update());
    window.addEventListener('resize', () => this.update());
  }
}
