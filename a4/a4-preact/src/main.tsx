import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

import * as State from "./state";

// global styles (e.g. reset)
import "./style.css";
import { useState } from "react";

export default function App() {
  const id = State.selectedShapeId.value;
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
// display not changed as form and shapelist change
// when undo stack len=0, button not disabled