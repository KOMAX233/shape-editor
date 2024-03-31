import * as State from "./state";
import { useEffect, useRef } from "preact/hooks";
import * as Drawings from "./drawings";

type ShapeProps = {
    shape: State.Shape;
};

export default function Shape({ shape }: ShapeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && shape.props) {
            const gc = canvas.getContext('2d');
            if (gc) drawShape(gc, shape.props);
        }
    }, [shape, shape.props]);
    const selected = (shape.selected)? 'ring-blue-600 ring-offset-[2px] ring-[1px]': '';
    return (
        <canvas class={`border-gray-500 border 
        w-[50px] h-[50px] 
        flex-none cursor-pointer text-black 
        hover:outline outline-[lightblue] outline-[4px]
        ${selected}`}
        width="100"
        height="100"
        ref={canvasRef}
        key={shape.id}
        onClick={(e) => {
            State.select(shape.id, e.shiftKey);
            e.stopPropagation();
            console.log("clicked shape");
        }}
        // style={{
        //     outline: shape.selected? '1px solid blue': 'none',
        //     outlineOffset: '2px'
        // }}
        >
        </canvas>
    );
}

export const drawShape = (gc: CanvasRenderingContext2D, props: State.ShapePropsType) => {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
    gc.save();
    // move 0,0 to canvas center
    gc.translate(gc.canvas.width / 2, gc.canvas.height / 2);
    // call the right shape drawing function with props
    switch (props.type) {
        case "Square":
            Drawings.square(gc, props);
            break;
        case "Star":
            Drawings.star(gc, props);
            break;
        case "Bullseye":
            Drawings.bullseye(gc, props);
            break;
        case "Cat":
            Drawings.cat(gc, props);
            break;
    }
    gc.restore();
}
