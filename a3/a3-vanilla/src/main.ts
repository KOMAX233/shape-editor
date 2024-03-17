import "./main.css"
import { Model } from "./model";
import { toolbarView } from "./toolbarView";
import { shapelistView } from "./shapelistView";
import { statusbarView } from "./statusbarView";
import { displayView } from "./displayview";
import { editorView } from "./editorview";
import { rightView } from "./rightview";

const model = new Model();
for (let i = 0; i < 8; i++) {
    model.create("square");
}

// root container (already in index.html)
const root = document.querySelector("div#app") as HTMLDivElement;

// create left and right view
const left = document.createElement("div");
left.id = "left";
// const right = document.createElement("div");
// right.id = "right";
const right = new rightView(model);

// create toolbar, shapelist, statusbar view
const toolbar = new toolbarView(model);
const shapelist = new shapelistView(model);
const statusbar = new statusbarView(model);

// add views to left (will be stacked vertically)
left.appendChild(toolbar.root);
left.appendChild(shapelist.root);
left.appendChild(statusbar.root);

// create displayview and editor view

const display = new displayView(model);
const editor = new editorView(model);


// add views to right
right.root.appendChild(display.root);
right.root.appendChild(editor.root);


// add to root
root.appendChild(left);
root.appendChild(right.root);
console.log("todo");