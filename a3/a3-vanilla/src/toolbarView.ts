// local imports
import View from "./view";
import { Model } from "./model";

import "./toolbarView.css";

export class toolbarView implements View {
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

  private buttonAdd: HTMLButtonElement;
  private buttonDelete: HTMLButtonElement;
  private buttonClear: HTMLButtonElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "toolbar";

    // then setup the widgets in the container

    // button with controller
    this.buttonAdd = document.createElement("button");
    this.buttonAdd.innerText = "?";
    this.buttonDelete = document.createElement("button");
    this.buttonDelete.innerText = "?";
    this.buttonClear = document.createElement("button");
    this.buttonClear.innerText = "?";
    // create controller
    this.buttonAdd.addEventListener("click", () => {
    //   const text = this.textfield.value;
    //   if (model.selectId !== null) {
    //     model.update(model.selectId, { text });
    //   } else {
    //     model.create(text);
    //   }
    //   this.textfield.value = "";
    });
    this.container.appendChild(this.buttonAdd);
    this.container.appendChild(this.buttonDelete);
    this.container.appendChild(this.buttonClear);

    // register with the model
    this.model.addObserver(this);
  }
}
