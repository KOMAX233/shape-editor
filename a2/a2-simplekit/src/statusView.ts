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
  }

  //#endregion

  label = new SKLabel({ text: "?", align: "left"});

  constructor(private model: Model) {
    super();

    // setup the view
    this.id = "status";
    this.fill = "lightgrey";
    this.padding = 10;

    // try removing fillWidth and/or height
    this.fillWidth = 1;
    this.height = 50;

    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    // add widgets to the view
    // this.textfield.fillWidth = 1;
    // this.addChild(this.textfield);
    this.addChild(this.label);

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
