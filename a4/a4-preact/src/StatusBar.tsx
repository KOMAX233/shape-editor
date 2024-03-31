// app state
import { num, numSelected, canUndo, canRedo, undoManager } from "./state";
import { useState, useEffect } from "preact/hooks";

export default function StatusBar() {
  const handleUndo = () => {
    undoManager.undo();
    canUndo.value = undoManager.canUndo;
    canRedo.value = undoManager.canRedo;
  };

  const handleRedo = () => {
    undoManager.redo();
    canUndo.value = undoManager.canUndo;
    canRedo.value = undoManager.canRedo;
  };

  return (
    <div class="h-[50px] bg-gray-200 flex items-center justify-between">
      <span class="min-w-[80px] py-0.5 px-2">
        {num.value} shape{(num.value > 1)? "s": ""}
      </span>
      <span class="space-x-[10px]">
        <button class="min-w-[80px]" 
        onClick={handleUndo}
        disabled={!canUndo.value}
        >
            Undo
        </button>
        <button class="min-w-[80px]" 
        onClick={handleRedo}
        disabled={!canRedo.value}
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
