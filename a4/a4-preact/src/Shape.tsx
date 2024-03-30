import * as State from "./state";

type ShapeProps = {
    shape: State.Shape;
};

export default function Shape({ shape }: ShapeProps) {
    return (
    <svg class="w-[50px] h-[50px] flex-none hover:cursor-pointer text-black hover:outline outline-[lightblue] outline-[4px]"
    key={shape.id}>
        {drawShape(shape)}
    </svg>
    );
}

const drawShape = (shape: State.Shape) => {
    switch (shape.type) {
        case 'Square':
            return <rect width="100%" height="100%" fill={`hsl(${shape.hue}, 100%, 50%)`} />;
        case 'Star':
            return <rect width="100%" height="100%" fill={`hsl(${shape.hue}, 100%, 50%)`} />;
        case 'Bullseye':
            return <rect width="100%" height="100%" fill={`hsl(${shape.hue}, 100%, 50%)`} />;
        case 'Cat':
            return <rect width="100%" height="100%" fill={`hsl(${shape.hue}, 100%, 50%)`} />;
    }
}
