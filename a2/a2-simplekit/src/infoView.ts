import {
  SKContainer,
  SKLabel,
  Layout,
  SKTextfield,
  SKResizeEvent,
  invalidateLayout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKSquare } from "./square";
import { makeStackColLayout } from "./stackCol";
import { SKStar } from "./star";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const id = this.model.selectId;
    // this.setEditorVisible(false);
    this.clearChildren();
    if (this.model.numSelected === 0) {
      this.message.text = "Select One";
      this.layoutMethod = Layout.makeCentredLayout();
      // this.setEditorVisible(false);
      this.addChild(this.message);

    } else if (this.model.numSelected === 1) {
      this.layoutMethod = makeStackColLayout();
      if (id !== null) {
        // this.message.text = `edit id#${this.model.selectId}`;
        const todo = this.model.todo(id);
        if (todo) {
          this.square.hue = todo.hue;
          // this.fieldHue.text = String(todo.text || "");
          
          if (!isNaN(todo.hue) && todo.hue >= 0 && todo.hue <= 360) {
            this.fieldHue.text = String(todo.hue);
          } else {
            this.fieldHue.text = todo.text;
          }
          this.addChild(this.up);
          this.addChild(this.down);
          this.resizeSquare();
        }
        
        this.fieldHue.text = String(todo?.text);

        // this.setEditorVisible(true);
        // this.resizeSquare();
      }
    } else {
      // let text = `${num} todo${num > 1 ? "s" : ""}`;
      // if (this.model.numSelected > 0) {
      //   text += ` (${this.model.numSelected} selected)`;
      // }
      this.layoutMethod = Layout.makeCentredLayout();
      this.message.text = "Too Many Selected";
      this.addChild(this.message);
      // this.setEditorVisible(false);
    }
    this.resizeSquare();
  }

  //#endregion

  message = new SKLabel({ text: "Select One", align: "centre"});
  up = new SKContainer();
  down = new SKContainer();
  square = new SKSquare();
  star = new SKStar();
  hueEditor = new SKContainer();
  labelHue = new SKLabel({text: "Hue", align: "right"});
  fieldHue = new SKTextfield({text: "?", width: 50});

  constructor(private model: Model) {
    super();
    this.id = "info";
    this.fill = "whitesmoke";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = Layout.makeCentredLayout();

    this.message.id = "message";
    this.message.fillWidth = 1;
    this.message.fillHeight = 1;
    console.log("message:", this.message.x, this.message.y, this.message.width, this.message.height)
    this.message.align = "centre";
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
    
    // this.setEditorVisible(false);

    // create controller
    this.fieldHue.addEventListener("textchanged", () => {
      const text = this.fieldHue.text;
      const hue = text;
      const hueVal = Number(hue);
      const id = model.selectId;
      if (id !== null) {
        model.update(id, { text });      
        model.select(id, true);
        if (!isNaN(hueVal) && hueVal >= 0 && hueVal <= 360) {
          model.update(id, { hue: hueVal });
        }   
        model.select(id, true);
      }
    });



    // register with the model when we're ready
    this.model.addObserver(this);
  }

  setEditorVisible(visible: boolean) {
    this.down.border = (visible)? "1px solid grey": "" ;
    if (!visible) {
      this.removeChild(this.up);
      this.removeChild(this.down);
      this.addChild(this.message);
    } else {
      // this.resizeSquare();
      this.removeChild(this.message);
      this.addChild(this.up);
      this.addChild(this.down);
    }
  }
  resizeSquare() {
    let newSize = 0;
    console.log(this.width, ", ", this.height)
    if (this.up.width && this.up.height) {
      newSize = Math.min(this.up.width - 20, this.up.height - 20);
    }
    if (newSize > 0) {
      this.square.size = newSize;
      this.square.width = newSize;
      this.square.height = newSize;
    }
    return newSize;
  }

  setTextVisible() {
    if (this.model.numSelected === 1) {
      this.removeChild(this.message);
    } else {
      this.addChild(this.message);
    }
  }
}
