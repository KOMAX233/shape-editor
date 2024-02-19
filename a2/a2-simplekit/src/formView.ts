import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { ExtendedSKButton } from "./extBut";

export class FormView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const id = this.model.selectId;
    // if (id !== null) {
    //   this.button_add.text = "Update";
    //   this.textfield.text = this.model.todo(id)?.text || "";
    // } else {
    //   this.button_add.text = "Add";
    //   this.textfield.text = "";
    // }
    this.button_add.enabled = this.model.num < 20;
    this.button_add_star.enabled = this.model.num < 20;
    this.button_delete.enabled = this.model.numSelected !== 0;
    this.button_clear.enabled = this.model.num !== 0;
  }

  //#endregion

  button_add = new ExtendedSKButton({ text: "Add", width: 80 });
  button_add_star = new ExtendedSKButton({ text: "Add Star", width: 80  });
  button_delete = new ExtendedSKButton({ text: "Delete", width: 80  });
  button_clear = new ExtendedSKButton({ text: "Clear", width: 80  });
  textfield = new SKTextfield({ text: "?" });

  constructor(private model: Model) {
    super();

    // setup the view
    this.id = "entry";
    this.fill = "lightgrey";
    this.padding = 10;

    // try removing fillWidth and/or height
    this.fillWidth = 1;
    this.height = 50;

    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    // add widgets to the view
    this.textfield.fillWidth = 1;
    // this.addChild(this.textfield);
    this.button_add.enabled = true;
    this.button_add_star.enabled = true;
    this.button_delete.enabled = true;
    this.button_clear.enabled = true;
    this.addChild(this.button_add);
    this.addChild(this.button_add_star);
    this.addChild(this.button_delete);
    this.addChild(this.button_clear);

    // create controller
    this.button_add.addEventListener("action", () => {
      const hue = model.randomHue();
      const text = String(hue);
      model.create(text, hue, "square");
      this.textfield.text = "";
    });

    
    this.button_add_star.addEventListener("action", () => {
      const hue = model.randomHue();
      const text = String(hue);
      const outer = model.randomR();
      const point = model.randomPoint();
      // if (model.selectId !== null) {
      //   model.update(model.selectId, { text });
      // } else {
      model.create(text, hue, "star", 15, outer, point);
      // }
      this.textfield.text = "";
    });

    
    this.button_delete.addEventListener("action", () => {
      if (model.selectId !== null) {
        model.delete(model.selectId);
      }
    });

    this.button_clear.addEventListener("action", () => {
      if (model.num > 0) {
        model.clear();
      }
      this.textfield.text = "";
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
