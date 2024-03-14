import "./main.css"
import { Model } from "./model";
import { toolbarView } from "./toolbarView";
import { shapelistView } from "./shapelistView";
import { statusbarView } from "./statusbarView";

const model = new Model();

// root container (already in index.html)
const root = document.querySelector("div#app") as HTMLDivElement;

// create left and right view
const left = document.createElement("div");
left.id = "left";
const right = document.createElement("div");
right.id = "right";

// create toolbar, shapelist, statusbar view
const toolbar = new toolbarView(model);
const shapelist = new shapelistView(model);
const statusbar = new statusbarView(model);

// add views to left (will be stacked vertically)
left.appendChild(toolbar.root);
left.appendChild(shapelist.root);
left.appendChild(statusbar.root);

// add to root
root.appendChild(left);
root.appendChild(right);
console.log("todo");