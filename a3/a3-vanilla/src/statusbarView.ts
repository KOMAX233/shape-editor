// local imports
import View from "./view";
import { Model } from "./model";

import "./statusbarView.css";

export class statusbarView implements View {
  //#region observer pattern
  update(): void {
    this.count.textContent = `${this.model.shapes.length} shape${(this.model.shapes.length > 1)? "s": ""}`;
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private count: HTMLLabelElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "toolbar";

    // then setup the widgets in the container
    this.count = document.createElement("label");
    this.count.id = "count";
    this.count.textContent = `${this.model.shapes.length} shape${(this.model.shapes.length > 1)? "s": ""}`;
    this.container.appendChild(this.count);

    // register with the model
    this.model.addObserver(this);
  }
}
