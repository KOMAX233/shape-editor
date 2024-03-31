import Shape from "./Shape";


import * as State from "./state";

export default function ShapeList() {
    return (
        <div class="p-[10px] w-full h-full bg-[white] "
        onClick={State.deSelectAll}
        >
            <div class="flex-1 flex flex-wrap gap-x-[10px] gap-y-[10px]">
                {State.shapes.value.map((shape) => (
                    <Shape key={shape.id} shape={shape} />
                ))}
            </div>
        </div>
    );
}
