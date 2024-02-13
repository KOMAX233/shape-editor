import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKSquare } from "./square";

export class TodoView extends SKContainer implements Observer {
  //#region observer pattern

  update() {
    const todo = this.model.todo(this.todoId);
    if (!todo) return;
    this.square.checked = todo.done;
    this.square.hue = todo.hue;
    // this.todoText.text = `${todo.text || "?"} (id#${todo.id})`;
  }

  //#endregion

  square = new SKSquare();
  // todoText = new SKLabel({ text: "?" });
  // selectButton = new SKButton({ text: " ", width: 18 });
  // delButton = new SKButton({ text: "X", width: 18 });

  constructor(private model: Model, protected todoId: number) {
    super();

    // view design
    // this.padding = 5;
    // this.margin = 5;
    this.fillWidth = 1;
    this.height = 40;
    // this.border = "grey";
    const todo = this.model.todo(this.todoId);
    if (todo) this.square.hue = todo?.hue;

    // setup the view
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 0 });
    this.addChild(this.square);
    // this.square.margin = 0;
    // this.addChild(this.todoText);
    // this.addChild(this.selectButton);
    // this.addChild(this.delButton);
    // this.todoText.fillWidth = 1;
    // this.todoText.align = "left";

    // controllers
    this.square.addEventListener("action", () => {
      model.update(todoId, { done: this.square.checked, hue: this.square.hue });
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
