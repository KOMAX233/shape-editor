// local imports
import View from "./view";
import { Model } from "./model";

import "./toolbarView.css";

export class toolbarView implements View {
  //#region observer pattern
  update(): void {
    this.buttonAdd.disabled = this.model.shapes.length >= 25;
    this.buttonDelete.disabled = this.model.numSelected === 0;
    this.buttonClear.disabled = this.model.shapes.length === 0;
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
    this.select.id = "select";
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        this.select.appendChild(option);
    }
    this.select.addEventListener("change", () => {
      console.log("selected", this.select.options[this.select.selectedIndex].text);
    });
    this.buttonAdd.addEventListener("click", () => {
      const draw = this.select.options[this.select.selectedIndex].text;
      this.model.create(draw, Math.floor(Math.random() * 361), 2 + Math.floor(Math.random() * 4), 3 + Math.floor(Math.random() * 8), 20 + Math.floor(Math.random() * 26), Math.floor(Math.random() * 3));
    });
    this.container.appendChild(this.buttonAdd);
    this.container.appendChild(this.select);
    this.container.appendChild(this.buttonDelete);
    this.container.appendChild(this.buttonClear);

    // register with the model
    this.model.addObserver(this);
  }
}
