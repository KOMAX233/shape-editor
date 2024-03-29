import { render } from "preact";

import LeftView from "./Left";
import RightView from "./Right";

// global styles (e.g. reset)
import "./style.css";

console.log("style-module");

export default function App() {
  return (
    // app "root"
    <div class="h-screen flex justify-center">
      {/* container */}
      <div class="flex-auto flex flex-col sm:flex-row items-stretch">
        {/* views */}
        <LeftView />
        <RightView colour="lightblue" />
      </div>
    </div>
  );
}

render(<App />, document.querySelector("div#app") as HTMLElement);

// todo: 
// rightview bg whitesmoke
