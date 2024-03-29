// app state
import { count, increment } from "./state";

export default function ToolBar() {
  return (
    <div class="h-[50px] p-[10px] bg-gray-200 flex items-center gap-[10px]">
      <button class="min-w-[80px]" onClick={() => increment()}>
        Add
      </button>
      <button class="min-w-[80px]" onClick={() => increment()}>
        Delete
      </button>
      <button class="min-w-[80px]" onClick={() => increment()}>
        Clear
      </button>
    </div>
  );
}
