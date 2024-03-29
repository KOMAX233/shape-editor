// app state
import { count } from "./state";

type ShapeListProps = {
  colour?: string;
};

export default function ShapeList({
  colour = "grey",
}: ShapeListProps) {
    const randomHue = () => {
        const hue = Math.floor(Math.random() * 361);
        const saturation = 100;
        const luminance  = 50;
        return `hsl(${hue}, ${saturation}%, ${luminance}%)`;
    };
  return (
    <div class="p-[10px] flex-1 bg-[white] flex flex-wrap gap-x-[10px] gap-y-[10px]">
      {[...Array(count.value)].map((_, i) => (
        <NumberBox num={i + 1} colour={randomHue()} />
      ))}
    </div>
  );
}

// A component for the box with a number in it.
type NumberBoxProps = {
  num: number;
  colour: string;
};

function NumberBox({ num, colour }: NumberBoxProps) {
  return (
    <div
      class="w-[50px] h-[50px] flex-none hover:cursor-pointer text-black hover:text-red-500"
      style={{ background: colour }}>
      {num}
    </div>
  );
}

// class={style.box}
