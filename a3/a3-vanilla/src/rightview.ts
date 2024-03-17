// local imports
import View from "./view";
import { Model } from "./model";

import "./rightview.css";

export class rightView implements View {
  //#region observer pattern
  update(): void {
    if (this.model.numSelected === 0) {
        this.message.textContent = "Select One";
        this.message.style.display = "flex";
    } else if (this.model.numSelected > 1) {
        this.message.textContent = "Too Many Selected";
        this.message.style.display = "flex";
    } else {
      this.message.style.display = "none";
    }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }
  private message: HTMLLabelElement;

//   private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "right";

    // then setup the widgets in the container
    this.message = document.createElement("label");
    this.message.id = "message";
    
    this.container.appendChild(this.message);
    // this.container.appendChild(this.select);

    // register with the model
    this.model.addObserver(this);
  }
}
