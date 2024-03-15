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
  private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "toolbar";

    // then setup the widgets in the container
    // button with controller
    this.buttonAdd = document.createElement("button");
    this.buttonAdd.innerText = "Add";
    this.buttonDelete = document.createElement("button");
    this.buttonDelete.innerText = "Delete";
    this.buttonClear = document.createElement("button");
    this.buttonClear.innerText = "Clear";
    // create controller
    this.buttonAdd.addEventListener("click", () => {
      model.create("square", 0);
    });
    this.buttonDelete.addEventListener("click", () => {
      if (model.selectID != null) {
        model.delete(model.selectID);
      }
      
    });
    this.buttonClear.addEventListener("click", () => {
      model.deleteAll();
    });
    // dropdown
    let options = ["Square", "Star", "Bullseye", "Cat"];
    this.select = document.createElement("select");
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        this.select.appendChild(option);
    }

    this.container.appendChild(this.buttonAdd);
    this.container.appendChild(this.select);
    this.container.appendChild(this.buttonDelete);
    this.container.appendChild(this.buttonClear);

    // register with the model
    this.model.addObserver(this);
  }
}
