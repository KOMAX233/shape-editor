import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

import * as State from "./state";

// global styles (e.g. reset)
import "./style.css";

export default function App() {
  const id = State.selectedShapeId.value;
  const value = id && State.getShape(id)?.hue;
  return (
    // app "root"
    <div class="h-screen flex justify-center">
      {/* container */}
      <div class="flex-auto flex sm:flex-row items-stretch">
        {/* views */}
        <LeftView />
        <RightView colour="lightblue" />
      </div>
    </div>
  );
}

render(<App />, document.querySelector("div#app") as HTMLElement);

// todo: 
// 9 Pressing the "Add" button creates a square, bullseye, star, or cat with properties displays it at the end of the shape list.
// only add square now

