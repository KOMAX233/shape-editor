// local imports
import View from "./view";
import { Model } from "./model";

import "./editorview.css";

export class editorView implements View {
  //#region observer pattern
  update(): void {
    const id = this.model.selectID;
    if (id != null) {
        const shape = this.model.shape(id);
        if (shape != null) {
            this.textHue.value = this.model.shape(id)?.texthue1 || "";
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
  private formHue: HTMLFormElement;
  private labelHue: HTMLLabelElement;
  private textHue: HTMLInputElement;

//   private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "editor";
    this.container.style.display = "none";

    // then setup the widgets in the container
    this.formHue = document.createElement("form");
    this.formHue.className = "form";

    this.labelHue = document.createElement("label");
    this.labelHue.className = "label";
    this.labelHue.textContent = "Hue";


    this.textHue = document.createElement("input");
    this.textHue.className = "input"
    this.textHue.type = "number";
    this.textHue.value = "?";
    // create controller
    // this.textHue.addEventListener("change", this.huechange.bind(this));
    // dropdown
    // let options = ["Square", "Star", "Bullseye", "Cat"];
    // this.select = document.createElement("select");
    // for (let i = 0; i < options.length; i++) {
    //     let option = document.createElement("option");
    //     option.value = options[i];
    //     option.text = options[i];
    //     this.select.appendChild(option);
    // }
    this.formHue.appendChild(this.labelHue);
    this.formHue.appendChild(this.textHue);
    this.container.appendChild(this.formHue);
    // this.container.appendChild(this.select);

    // register with the model
    this.model.addObserver(this);
  }

  huechange() {
    const hue = Number(this.textHue.value);
    if (hue > 360 || hue < 0) {
        // red outline, 
        // "value must be in a range of 0 to 360"
    }
  }
}
