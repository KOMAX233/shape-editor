import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

import * as State from "./state";

// global styles (e.g. reset)
import "./style.css";
import { useEffect } from "preact/hooks";

export default function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // console.log(e.ctrlKey, e.shiftKey, e.key)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z") {
        State.undoManager.redo();
        console.log("redo")
      } else if (e.ctrlKey && e.key.toLowerCase() === "z") {
        State.undoManager.undo();
        console.log("undo")
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, []);

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