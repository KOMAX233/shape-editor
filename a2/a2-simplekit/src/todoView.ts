import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
  SKKeyboardEvent,
  SKEvent,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKSquare } from "./square";
import { SKStar } from "./star";

export class TodoView extends SKContainer implements Observer {
  //#region observer pattern

  update() {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
    if (todo.shape == "square") {
      this.square.checked = todo.selected;
      this.square.hue = todo.hue;
    } else if (todo.shape == "star") {
      this.star.checked = todo.selected;
      this.star.hue = todo.hue;
      this.star.outer = todo.outer;
      this.star.point = todo.point;
    }

    // this.todoText.text = `${todo.text || "?"} (id#${todo.id})`;
  }

  //#endregion

  square = new SKSquare();
  star = new SKStar();

  
  // todoText = new SKLabel({ text: "?" });
  // selectButton = new SKButton({ text: " ", width: 18 });
  // delButton = new SKButton({ text: "X", width: 18 });

  constructor(private model: Model, protected todoId: number) {
    super();

    // view design
    this.padding = 20;
    // this.margin = 10;
    this.fillWidth = 1;
    this.width = 70;
    this.height = 70;
    // this.border = "grey";
    const todo = this.model.todo(this.todoId);
    if (todo) {
      this.square.hue = todo.hue;
      this.star.hue = todo.hue;
      this.star.checked = todo.selected;
      this.star.hue = todo.hue;
      this.star.point = todo.point;
      this.star.outer = todo.outer;
    }
    // setup the view
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 0 });
    if (todo?.shape == "square") {
      this.addChild(this.square);
    } else if (todo?.shape == "star") {
      this.addChild(this.star);
    }
    // this.square.margin = 0;
    // this.addChild(this.todoText);
    // this.addChild(this.selectButton);
    // this.addChild(this.delButton);
    // this.todoText.fillWidth = 1;
    // this.todoText.align = "left";

    // controllers
    this.square.addEventListener("action", () => {
      console.log("selected", todo?.selected, this.square.checked)
      // if (todo?.selected) {
        model.update(todoId, { hue: this.square.hue });
        model.select(todoId, model.shiftPressed);
      // } else {

      // }
      
    });
    
    this.star.addEventListener("action", () => {
      model.update(todoId, { hue: this.star.hue, outer: this.star.outer, point: this.star.point});
      model.select(todoId, model.shiftPressed);
      // console.log("selected", this.square.checked)
    });
    // this.delButton.addEventListener("action", () => {
    //   model.delete(todoId);
    // });
    // this.selectButton.addEventListener("action", () => {
    //   model.select(todoId);
    // });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
