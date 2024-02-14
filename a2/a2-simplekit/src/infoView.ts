import {
  SKContainer,
  SKLabel,
  Layout,
  SKTextfield,
  SKResizeEvent,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKSquare } from "./square";
import { makeStackColLayout } from "./stackCol";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const num = this.model.num;
    // if (num === 0) {
      // this.message.text = "no todos!";
    // } else if (this.model.selectId !== null) {
    //   this.message.text = `edit id#${this.model.selectId}`;
    // } else {
      // let text = `${num} todo${num > 1 ? "s" : ""}`;
      // if (this.model.numSelected > 0) {
      //   text += ` (${this.model.numSelected} selected)`;
      // }

      // this.message.text = text;
    // }
    // if (num === 0) {
    //   // this.message.text = "no todos!";
    //   this.setEditorVisible(false);
    // } else 
    if (this.model.selectId !== null && this.model.numSelected === 1) {
      // this.message.text = `edit id#${this.model.selectId}`;
      const todo = this.model.todo(this.model.selectId);
      if (todo) this.square.hue = todo?.hue;
      if (this.width && this.height) {
        if (this.width < this.height) {
          this.square.width = this.up.width;
          this.square.height = this.up.width;
        } else {
          this.square.width = this.up.height;
          this.square.height = this.up.height;
        }
      }
      this.square.width = this.up.width;
      this.square.height = this.up.height;
      this.fieldHue.text = String(this.square.hue);
      this.setEditorVisible(true);
      this.resizeSquare();
    } else {
      // let text = `${num} todo${num > 1 ? "s" : ""}`;
      // if (this.model.numSelected > 0) {
      //   text += ` (${this.model.numSelected} selected)`;
      // }
      // this.message.text = text;
      this.setEditorVisible(false);
    }
    this.resizeSquare();
  }

  //#endregion

  // message = new SKLabel({ text: "?" });
  up = new SKContainer();
  down = new SKContainer();
  square = new SKSquare();
  hueEditor = new SKContainer();
  labelHue = new SKLabel({text: "Hue", align: "right"});
  fieldHue = new SKTextfield({text: String(this.square.hue), width: 50});

  constructor(private model: Model) {
    super();
    this.id = "info";
    this.fill = "whitesmoke";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = makeStackColLayout();

    // this.addChild(this.message);
    // this.addChild(this.square);
    this.up.id = "up";
    // this.up.margin = 0;
    this.up.padding = 10;
    // this.up.border = "1px solid grey";
    this.up.layoutMethod = Layout.makeCentredLayout();
    this.up.addChild(this.square);
    this.addChild(this.up);

    this.hueEditor.fillWidth = 1;
    this.hueEditor.layoutMethod = Layout.makeFillRowLayout();
    this.hueEditor.addChild(this.labelHue);
    this.hueEditor.addChild(this.fieldHue);


    this.down.id = "down";
    // this.down.margin = 0;
    this.down.padding = 10;
    this.down.border = "1px solid grey";
    this.down.layoutMethod = Layout.makeFillRowLayout();
    this.down.addChild(this.hueEditor);
    this.addChild(this.down);
    

    this.setEditorVisible(false);
    this.resizeSquare();



    // register with the model when we're ready
    this.model.addObserver(this);
  }

  setEditorVisible(visible: boolean) {
    this.down.border = (visible)? "1px solid grey": "" ;
    if (!visible) {
      this.removeChild(this.up);
      this.removeChild(this.down);
    } else {
      this.addChild(this.up);
      this.addChild(this.down);
    }
  }
  resizeSquare() {
    let newSize = 0;
    if (this.up.width && this.up.height) {
      newSize = Math.min(this.up.width, this.up.height);
    }
    if (newSize > 0) {
      this.square.size = newSize;
    }
  }
}
