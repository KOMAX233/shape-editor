// app state
import { useState } from "preact/hooks";
import * as State from "./state";
import type { ShapeType } from "./state";

export default function ToolBar() {
    const addDisabled = State.num.value >= 25;
    const deleteDisabled = State.selectedShapeId.value == null;
    const clearDisabled = State.num.value <= 0;

    // selected shape type
    const [selectedShape, setSelectedShape] = useState<ShapeType>("Square");
    // add selected shape type
    const handleAddClick = () => {
        State.addShape(selectedShape);
        console.log(selectedShape);
    };
    const handleDeleteClick = () => {
        if (State.selectedShapeId.value) {
            State.deleteShape(State.selectedShapeId.value);
        }
    };
    const handleClearClick = () => {
        State.clearShape();
    };
    // update
    const handleShapeChange = (event) => {
        setSelectedShape(event.target.value);
        // console.log(event.target.value)
    };

    return (
        <div class="h-[50px] p-[10px] bg-gray-200 flex items-center gap-[10px]">
            <button class="min-w-[80px]" onClick={handleAddClick}
            disabled={addDisabled}
            >
                Add
            </button>
            <select class="min-w-[85px]" onChange={handleShapeChange} defaultValue="Square">
                <option value="Square">Square</option>
                <option value="Star">Star</option>
                <option value="Bullseye">Bullseye</option>
                <option value="Cat">Cat</option>
            </select>
            <button class="min-w-[80px]" onClick={handleDeleteClick}
            disabled={deleteDisabled}
            >
                Delete
            </button>
            <button class="min-w-[80px]" onClick={handleClearClick}
            disabled={clearDisabled}
            >
                Clear
            </button>
        </div>
    );
}