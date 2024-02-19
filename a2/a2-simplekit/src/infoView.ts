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
    this.up.clearChildren();
    this.down.clearChildren();
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
          this.down.layoutMethod = makeStackColLayout();
          // add radius, point if shape is 
          this.down.addChild(this.hueEditor);
          if (todo.shape === "star") {
            // if editors are not added
            let exists = this.down.children.some((c) => {
              c === this.radiusEditor;
            });
            if (!exists) {
              this.down.addChild(this.radiusEditor);
            }
            exists = this.down.children.some((c) => {
              c === this.pointEditor;
            });
            if (!exists) {
              this.down.addChild(this.pointEditor);
            }
          }
          if (todo.shape === "square") {
            this.up.addChild(this.square);
            this.square.hue = todo.hue;
          } else if (todo.shape === "star") {
            this.up.addChild(this.star);
            this.star.hue = todo.hue;
            this.star.outer = todo.outer;
            this.star.point = todo.point;
            if (!isNaN(todo.outer) && todo.outer >= 20 && todo.outer <= 45) {
              this.fieldHuer.text = String(todo.outer);
            } else {
              this.fieldHuer.text = todo.textOuter;
            }
            if (!isNaN(todo.point) && todo.point >= 3 && todo.point <= 10) {
              this.fieldHuep.text = String(todo.point);
            } else {
              this.fieldHuep.text = todo.textPoint;
            }
          }
          // this.fieldHue.text = String(todo.text || "");
          
          if (!isNaN(todo.hue) && todo.hue >= 0 && todo.hue <= 360) {
            this.fieldHue.text = String(todo.hue);
          } else {
            this.fieldHue.text = todo.text;
          }
          this.addChild(this.up);
          this.addChild(this.down);
          // this.resizeSquare();
        this.fieldHue.text = todo.text;
        this.fieldHuer.text = todo.textOuter;
        this.fieldHuep.text = todo.textPoint;
        }
        

        // this.setEditorVisible(true);
        this.resizeSquare();
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
    // this.resizeSquare();
  }

  //#endregion

  message = new SKLabel({ text: "Select One", align: "centre"});
  up = new SKContainer();
  down = new SKContainer();
  square = new SKSquare();
  star = new SKStar({back: false});
  hueEditor = new SKContainer();
  labelHue = new SKLabel({text: "Hue", align: "right"});
  fieldHue = new SKTextfield({text: "?", width: 50});
  radiusEditor = new SKContainer();
  labelHuer = new SKLabel({text: "Radius", align: "right"});
  fieldHuer = new SKTextfield({text: "?", width: 50});
  pointEditor = new SKContainer();
  labelHuep = new SKLabel({text: "Points", align: "right"});
  fieldHuep = new SKTextfield({text: "?", width: 50});


  constructor(private model: Model) {
    super();
    this.id = "info";
    this.fill = "whitesmoke";
    this.fillWidth = 1;
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = Layout.makeCentredLayout();

    this.message.id = "message";
    this.message.fillWidth = 1;
    this.message.fillHeight = 1;
    this.message.align = "centre";
    this.up.id = "up";
    // this.up.margin = 0;
    this.up.padding = 10;
    // this.up.border = "1px solid grey";
    this.up.fillWidth = 1;
    this.up.layoutMethod = Layout.makeCentredLayout();
    
    // this.up.addChild(this.square);
    // this.addChild(this.up);

    this.hueEditor.id = "hueE";
    this.hueEditor.fillWidth = 1;
    this.hueEditor.layoutMethod = Layout.makeFillRowLayout();
    this.hueEditor.addChild(this.labelHue);
    this.hueEditor.addChild(this.fieldHue);

    this.radiusEditor.id = "radiusE";
    this.radiusEditor.fillWidth = 1;
    this.radiusEditor.layoutMethod = Layout.makeFillRowLayout();
    this.radiusEditor.addChild(this.labelHuer);
    this.radiusEditor.addChild(this.fieldHuer);
    
    this.pointEditor.id = "pointE";
    this.pointEditor.fillWidth = 1;
    this.pointEditor.layoutMethod = Layout.makeFillRowLayout();
    this.pointEditor.addChild(this.labelHuep);
    this.pointEditor.addChild(this.fieldHuep);


    this.down.id = "down";
    // this.down.margin = 0;
    this.down.padding = 10;
    this.down.border = "1px solid grey";
    this.down.fillWidth = 1;
    this.down.layoutMethod = Layout.makeCentredLayout();
    this.down.addChild(this.hueEditor);
    // this.down.addChild(this.radiusEditor);
    // this.down.addChild(this.pointEditor);
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

    this.fieldHuer.addEventListener("textchanged", () => {
      const textOuter = this.fieldHuer.text;
      const r = textOuter;
      const rVal = Number(r);
      const id = model.selectId;
      if (id !== null) {
        model.update(id, { textOuter });      
        model.select(id, true);
        if (!isNaN(rVal) && rVal >= 20 && rVal <= 45) {
          model.update(id, { outer: rVal });
        }   
        model.select(id, true);
      }
    });    
    
    this.fieldHuep.addEventListener("textchanged", () => {
      const textPoint = this.fieldHuep.text;
      const p = textPoint;
      const pVal = Number(p);
      const id = model.selectId;
      if (id !== null) {
        model.update(id, { textPoint });      
        model.select(id, true);
        if (!isNaN(pVal) && pVal >= 3 && pVal <= 10) {
          model.update(id, { point: pVal });
        }
        model.select(id, true);
      }
    });
    
  invalidateLayout();



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
