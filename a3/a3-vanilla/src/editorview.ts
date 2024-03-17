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
            if (shape.drawing === "Star") {
              this.textR.value = this.model.shape(id)?.textR || "";
              this.formR.style.display = "block";
              this.textPoint.value = this.model.shape(id)?.textPoint || "";
              this.formPoint.style.display = "block";
            } else if (shape.drawing === "Bullseye") {
              this.textHue2.value = this.model.shape(id)?.texthue2 || "";
              this.formHue2.style.display = "block";
              this.textRing.value = this.model.shape(id)?.textRing || "";
              this.formRing.style.display = "block";
            } else {
              this.formR.style.display = "none";
              this.formPoint.style.display = "none";
            }
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

  private formR: HTMLFormElement;
  private labelR: HTMLLabelElement;
  private textR: HTMLInputElement;
  
  private formPoint: HTMLFormElement;
  private labelPoint: HTMLLabelElement;
  private textPoint: HTMLInputElement;
  
  private formRing: HTMLFormElement;
  private labelRing: HTMLLabelElement;
  private textRing: HTMLInputElement;
  
  private formHue2: HTMLFormElement;
  private labelHue2: HTMLLabelElement;
  private textHue2: HTMLInputElement;

//   private select: HTMLSelectElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "editor";
    this.container.style.display = "none";

    // then setup the widgets in the container
    // hue
    this.formHue = document.createElement("form");
    this.formHue.className = "form";
    // this.formHue.style.display = "none";

    this.labelHue = document.createElement("label");
    this.labelHue.className = "label";
    this.labelHue.textContent = "Hue 1";


    this.textHue = document.createElement("input");
    this.textHue.className = "input"
    this.textHue.type = "number";
    this.textHue.value = "?";
    

    // radius
    this.formR = document.createElement("form");
    this.formR.className = "form";
    this.formR.style.display = "none";

    this.labelR = document.createElement("label");
    this.labelR.className = "label";
    this.labelR.textContent = "Radius";


    this.textR = document.createElement("input");
    this.textR.className = "input"
    this.textR.type = "number";
    this.textR.value = "?";

    // point
    this.formPoint = document.createElement("form");
    this.formPoint.className = "form";
    this.formPoint.style.display = "none";

    this.labelPoint = document.createElement("label");
    this.labelPoint.className = "label";
    this.labelPoint.textContent = "Point";


    this.textPoint = document.createElement("input");
    this.textPoint.className = "input"
    this.textPoint.type = "number";
    this.textPoint.value = "?";
    
    // ring
    this.formRing = document.createElement("form");
    this.formRing.className = "form";
    this.formRing.style.display = "none";

    this.labelRing = document.createElement("label");
    this.labelRing.className = "label";
    this.labelRing.textContent = "Rings";


    this.textRing = document.createElement("input");
    this.textRing.className = "input"
    this.textRing.type = "number";
    this.textRing.value = "?";

    // hue2
    this.formHue2 = document.createElement("form");
    this.formHue2.className = "form";
    this.formHue2.style.display = "none";

    this.labelHue2 = document.createElement("label");
    this.labelHue2.className = "label";
    this.labelHue2.textContent = "Hue 2";


    this.textHue2 = document.createElement("input");
    this.textHue2.className = "input"
    this.textHue2.type = "number";
    this.textHue2.value = "?";
    
    // create controller
    this.formHue.appendChild(this.labelHue);
    this.formHue.appendChild(this.textHue);
    this.container.appendChild(this.formHue);

    this.formR.appendChild(this.labelR);
    this.formR.appendChild(this.textR);
    this.container.appendChild(this.formR);
    
    this.formPoint.appendChild(this.labelPoint);
    this.formPoint.appendChild(this.textPoint);
    this.container.appendChild(this.formPoint);
    
    this.formHue2.appendChild(this.labelHue2);
    this.formHue2.appendChild(this.textHue2);
    this.container.appendChild(this.formHue2);
    
    this.formRing.appendChild(this.labelRing);
    this.formRing.appendChild(this.textRing);
    this.container.appendChild(this.formRing);
    
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
