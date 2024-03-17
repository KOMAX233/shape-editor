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
      if (s.selected) {
        shape.classList.add("selected");
      } else {
        shape.classList.remove("selected");
      }
      shape.addEventListener("click", (e) => {
        e.stopPropagation();
        this.model.select(s.id);
        console.log("click square")
      });
      this.container.appendChild(shape);
    });
    this.container.addEventListener("click", () => {
      console.log("click background")
      this.model.deselectAll();
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
      shape.addEventListener("click", (e) => {
        e.stopPropagation();
        this.model.select(s.id);
        console.log("click square")
      });
      this.container.appendChild(shape);
    });

    this.container.addEventListener("click", () => {
      console.log("click background")
      this.model.deselectAll();
    });
    // controller of shapes

    // register with the model
    this.model.addObserver(this);
  }
}
