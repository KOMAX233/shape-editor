import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
  Settings,
  setSKEventListener,
  SKKeyboardEvent,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { FormView } from "./formView";
import { ListView } from "./listView";
import { StatusView } from "./statusView";
import { makeStackColLayout } from "./stackCol";
import { InfoView } from "./infoView";
import { SKSquare } from "./square";

// data
const model = new Model();
for (let i = 0; i < 8; i++) {
  const tempHue = model.randomHue();
  model.create(String(tempHue), tempHue, "square");
}


// user interface

// root container
const root = new SKContainer();
root.id = "root";
root.layoutMethod = Layout.makeFillRowLayout();

const left = new SKContainer();
left.fillWidth = 2;
left.fillHeight = 1;
left.layoutMethod = makeStackColLayout();

// add views to left (will be stacked vertically)
left.addChild(new FormView(model));

left.addChild(new ListView(model));
left.addChild(new StatusView(model));

// add views to root (will be left and right areas)
root.addChild(left);
// root.addChild(new InfoView(model));

// const Square = new SKSquare();
// Square.margin = 10;
// left.addChild(Square);


const right = new SKContainer();
right.margin = 10;
right.padding = 10;
right.fill = "whitesmoke";
right.fillWidth = 1;
right.fillHeight = 1;
right.layoutMethod = makeStackColLayout();
right.border = "1px solid grey";
right.addChild(new InfoView(model));
root.addChild(right);
// console.log("shift:", model.shiftPressed)

setSKEventListener((e) => {
  const ke = e as SKKeyboardEvent;
  if (ke.key === "Shift") {
    if (e.type == "keydown") {
      model.toggleShift();
      // console.log("shift:", model.shiftPressed)
    } else if (e.type == "keyup") {
      model.toggleShift();
      // console.log("shift:", model.shiftPressed)
    }
  }
});

setSKRoot(root);

startSimpleKit();

// Settings.debug = true;

// fix: have to do any action to make the infoview square show up

// make hue label and textfield in center

// resize infoview square

// 13 The square is scaled to be as large as possible while preserving approximately a minium of 10px away from the editor and form borders.

// pressing add button makes editor and message goes down??

// 22 When the "Shift" key is held down, clicking on an unselected square selects that square, but does not deselect any other square. Clicking on a selected square deselects it, but does not deselect any other square.

