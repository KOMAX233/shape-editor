// app state
import { num, numSelected } from "./state";

export default function StatusBar() {
  return (
    <div class="h-[50px] bg-gray-200 flex items-center justify-between">
      <span class="min-w-[80px] py-0.5 px-2">
        {num.value} shape{(num.value > 1)? "s": ""}
      </span>
      <span class="space-x-[10px]">
        <button class="min-w-[80px]" 
        // onClick={handleUndoClick}
        // disabled={undoDisabled}
        >
            Undo
        </button>
        <button class="min-w-[80px]" 
        // onClick={handleRedoClick}
        // disabled={redoDisabled}
        >
            Redo
        </button>
      </span>
      <span class="min-w-[80px] py-0.5 px-2 text-right">
        {(numSelected.value >= 0) ? `selected ${numSelected.value}` : ""}
      </span>
    </div>
  );
}
