import html from "html-template-tag";

// local imports
import { Model } from "./model";
import View from "./view";

import "./shapelistView.css";

export class shapelistView implements View {
  //#region observer pattern

  update(): void {
    this.container.replaceChildren();
    this.model.shapes.forEach((s) => {
      const shape = document.createElement("div");
      shape.style.backgroundColor = `hsl(${s.hue1}deg 100% 50%)`;
      this.container.appendChild(shape);
    });
  }

  //#endregion

  // the actual HTML element hosting this view
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.id = "shapelist";

    this.model.shapes.forEach((s) => {
      const shape = document.createElement("div");
      shape.style.backgroundColor = `hsl(${s.hue1}deg 100% 50%)`;
      this.container.appendChild(shape);
    })
    // register with the model
    this.model.addObserver(this);
  }
}
