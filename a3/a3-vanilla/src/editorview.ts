// local imports
import View from "./view";
import { Model } from "./model";

import "./editorview.css";

export class editorView implements View {
  //#region observer pattern
  update(): void {
    const id = this.model.selectID;
    if (this.model.numSelected === 1) {
      if (!id) return;
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
    this.formHue.appendChild(this.labelHue);
    this.formHue.appendChild(this.textHue);
    this.container.appendChild(this.formHue);
    // this.container.appendChild(this.select);

    // register with the model
    this.model.addObserver(this);
    this.textHue.addEventListener('change', (e) => {
      if (e.target instanceof HTMLInputElement) {
        const newHue = parseInt(e.target.value, 10);
        if (!isNaN(newHue) && newHue >= 0 && newHue <= 360) {
          const id = this.model.selectID;
          if (id !== null) {
              this.model.update(id, { hue1: newHue, texthue1: String(newHue) });
          }
        }
      }
    });
  }
}
