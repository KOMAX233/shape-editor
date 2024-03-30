import * as State from "./state";
import { useRef, useState, useEffect } from "preact/hooks";

export default function Display() {
    const displayRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 100, height: 100});
    const id = State.selectedShapeId.value;
    if (!id) {
        return;
    }
    const shape = State.getShape(id);
    if (!shape) {
        return;
    }

    useEffect(() => {
        const resize = () => {
            if (displayRef.current) {
                const {width, height} = displayRef.current.getBoundingClientRect();
                const minSize = Math.min(width, height);
                setSize({width: minSize, height: minSize});
            };
        }
        resize();
        window.addEventListener('resize', resize);
    }, []);

    return (
    <div ref={displayRef} class="h-2/3 flex flex-1 flex-col items-center justify-center mb-[10px] ">
        <svg class="flex-none" style={{ width: `${size.width}px`, height: `${size.height}px` }}>
            <rect width="100%" height="100%" fill={`hsl(${shape?.props.hue}, 100%, 50%)`} />
        </svg>
    </div>
    );
}
