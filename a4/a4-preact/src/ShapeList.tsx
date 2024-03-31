import Shape from "./Shape";


import * as State from "./state";

export default function ShapeList() {
    return (
        <div class="p-[10px] w-full h-full bg-[white] flex flex-wrap gap-x-[10px] gap-y-[10px]"
        onClick={State.deSelectAll}
        >
            {State.shapes.value.map((shape) => (
                <Shape key={shape.id} shape={shape} />
            ))}
        </div>
    );
}
