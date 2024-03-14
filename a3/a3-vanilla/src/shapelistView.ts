// local imports
import View from "./view";
import { Model } from "./model";

import "./shapelistView.css";

export class shapelistView implements View {
  //#region observer pattern
  update(): void {
    // const id = this.model.selectId;
    // if (id !== null) {
    //   this.button.innerText = "Update";
    //   this.textfield.value = this.model.todo(id)?.text || "";
    // } else {
    //   this.button.innerText = "Add";
    //   this.textfield.value = "";
    // }
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "shapelist";

    // then setup the widgets in the container
    // this.count = document.createElement("label");
    // this.count.textContent = "?";
    // this.container.appendChild(this.count);

    // register with the model
    this.model.addObserver(this);
  }
}
