import Shape from "./Shape";


import * as State from "./state";

export default function ShapeList() {
    return (
        <div class="p-[10px] flex-1 bg-[white] flex flex-wrap gap-x-[10px] gap-y-[10px]">
            {State.shapes.value.map((shape) => (
                <Shape shape={shape} />
            ))}
        </div>
    );
}
