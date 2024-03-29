// app state
import { count, increment, decrement } from "./state";

export default function ToolBar() {
  return (
    <div class="h-[50px] p-[10px] bg-gray-200 flex items-center gap-[10px]">
      <button class="min-w-[80px]" onClick={() => increment()}>
        Add
      </button>
      <select class="min-w-[85px]" /*onChange={handleShapeChange}*/ defaultValue="Square">
        <option value="Square">Square</option>
        <option value="Star">Star</option>
        <option value="Bullseye">Bullseye</option>
        <option value="Cat">Cat</option>
      </select>
      <button class="min-w-[80px]" onClick={() => increment()}>
        Delete
      </button>
      <button class="min-w-[80px]" onClick={() => decrement()}>
        Clear
      </button>
    </div>
  );
}
