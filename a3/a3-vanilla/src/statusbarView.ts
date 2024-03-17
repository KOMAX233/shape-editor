// local imports
import View from "./view";
import { Model } from "./model";

import "./statusbarView.css";

export class statusbarView implements View {
  //#region observer pattern
  update(): void {
    this.count.textContent = `${this.model.shapes.length} shape${(this.model.shapes.length > 1)? "s": ""}`;
    this.key.textContent = (this.model.shiftPressed)? "SHIFT": "";
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private count: HTMLDivElement;
  private key: HTMLDivElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "toolbar";

    // then setup the widgets in the container
    this.count = document.createElement("div");
    this.count.classList.add("count");
    this.count.textContent = `${this.model.shapes.length} shape${(this.model.shapes.length > 1)? "s": ""}`;
    this.container.appendChild(this.count);

    this.key = document.createElement("div");
    this.key.classList.add("key");
    this.key.textContent = (this.model.shiftPressed)? "SHIFT": "";
    this.container.appendChild(this.key);

    // register with the model
    this.model.addObserver(this);
  }
}
