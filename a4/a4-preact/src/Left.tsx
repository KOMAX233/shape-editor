// app state
import ShapeList from "./ShapeList";
import StatusBar from "./StatusBar";
import ToolBar from "./ToolBarView";
import { count, increment } from "./state";

export default function LeftView() {
  return (
    <div class="w-2/3 flex flex-1 flex-col">
      <ToolBar></ToolBar>
      <ShapeList colour="lightblue" />
      <StatusBar></StatusBar>
    </div>
  );
}
