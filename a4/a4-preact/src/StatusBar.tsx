// app state
import { num, numSelected, updateShape } from "./state";
import { useState, useEffect } from "preact/hooks";
import { UndoManager } from "./UndoManager";

const undoManager = new UndoManager();

export default function StatusBar() {
  const [canUndo, setCanUndo] = useState(undoManager.canUndo);
  const [canRedo, setCanRedo] = useState(undoManager.canRedo);

  const handleUndo = () => {
    undoManager.undo();
    updateState();
  };

  const handleRedo = () => {
    undoManager.redo();
    updateState();
  };
  
  const updateState = () => {
    setCanUndo(undoManager.canUndo);
    setCanRedo(undoManager.canRedo);
  };

  // Ensure the buttons are correctly enabled/disabled when the component mounts
  useEffect(() => {
    updateState();
  }, []);

  return (
    <div class="h-[50px] bg-gray-200 flex items-center justify-between">
      <span class="min-w-[80px] py-0.5 px-2">
        {num.value} shape{(num.value > 1)? "s": ""}
      </span>
      <span class="space-x-[10px]">
        <button class="min-w-[80px]" 
        onClick={handleUndo}
        disabled={!canUndo}
        >
            Undo
        </button>
        <button class="min-w-[80px]" 
        onClick={handleRedo}
        disabled={!canRedo}
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
