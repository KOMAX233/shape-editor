import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
  SKLabel,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class StatusView extends SKContainer implements Observer {
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
    const numShape = this.model.num;
    this.label.text = numShape + ((numShape > 1)? " shapes" : " shape");
    if (this.model.numSelected > 0) {
      this.message.text = `selected ${this.model.numSelected}`;
    } else {
      this.message.text = "";
    }
      // let text = `${num} todo${num > 1 ? "s" : ""}`;
      // if (this.model.numSelected > 0) {
      //   text += ` (${this.model.numSelected} selected)`;
      // }
      // this.message.text = text;
    if (!this.model.shiftPressed) {
      this.shift.text = "";
    } else {
      this.shift.text = "SHIFT";
    }
  }

  //#endregion

  label = new SKLabel({ text: "?", align: "left"});
  message = new SKLabel({ text: "?", align: "right"}); 
  shift = new SKLabel({ text: "SHIFT", align: "centre"}); 

  constructor(private model: Model) {
    super();

    // setup the view
    this.id = "status";
    this.fill = "lightgrey";
    this.padding = 10;

    // try removing fillWidth and/or height
    this.fillWidth = 1;
    this.height = 50;

    this.layoutMethod = Layout.makeFillRowLayout({ gap: 0 });

    this.label.fillWidth = 1;
    this.message.fillWidth = 1;
    this.shift.fillWidth = 1;
    this.addChild(this.label);
    this.addChild(this.shift);
    this.addChild(this.message);

    // create controller
    // this.button_add.addEventListener("action", () => {
    //   const text = this.textfield.text;
    //   if (model.selectId !== null) {
    //     model.update(model.selectId, { text });
    //   } else {
    //     model.create(text);
    //   }
    //   this.textfield.text = "";
    // });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
