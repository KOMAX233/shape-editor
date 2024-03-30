import Shape from "./Shape";
import { drawShape} from "./Shape";
import * as State from "./state";
import { useRef, useState, useEffect } from "preact/hooks";

export default function Display() {
    const displayRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ width: 100, height: 100});
    const id = State.selectedShapeId.value;

    useEffect(() => {
        const shape = id? State.getShape(id) : null;
        // console.log("no shape")
        if (!shape) return;
        const canvas = canvasRef.current;
        // console.log("no canvas")
        if (!canvas) return;
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.width = '100px';
        canvas.style.height = '100px';
        const gc = canvas.getContext('2d');
        // console.log("no context")
        if (!gc) return;
        // console.log("didnt return")

        gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
        drawShape(gc, shape.props);

        const resize = () => {
            if (displayRef.current) {
                const {width, height} = displayRef.current.getBoundingClientRect();
                const scale = Math.min(width / 100, height / 100);
                setSize({width: 100*scale, height: 100*scale});
                canvas.style.width = `${size.width}px`;
                canvas.style.height = `${size.height}px`;
                // console.log(canvas.style.width, canvas.style.height)
            };
        }
        resize();
        window.addEventListener('resize', resize);
    }, [id]);

    return (
    <div ref={displayRef} class="h-2/3 flex flex-1 flex-col items-center justify-center mb-[10px] ">
        <canvas
        ref={canvasRef} 
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
        ></canvas>
    </div>
    );
}
